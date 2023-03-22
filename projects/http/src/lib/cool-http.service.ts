import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { HttpHeader } from './http-header.model';
import { CookieStore } from './cookie-store.service';
import { IRequestInterceptor } from './request-interceptor.interface';
import { IResponseInterceptor } from './response-interceptor.interface';
import { HttpError } from './http-error.model';
import { DEFAULT_REQUEST_OPTIONS, RequestOptions } from './request-options.interface';
import { firstValueFrom, from, Observable } from 'rxjs';
import { AngularRequestOptions } from './angular-request-options.interface';

export type Func<T, T1, T2, TResult> = (item: T, item1: T1, item2: T2) => TResult;

@Injectable()
export class CoolHttp {
  private _cookieStore: CookieStore = new CookieStore();

  private _globalHeaders: HttpHeader[] = [];
  private _requestInterceptors: IRequestInterceptor[] = [];
  private _responseInterceptors: IResponseInterceptor[] = [];
  private _customCookieToHeaders: {
    cookieName: string;
    customHeaderName: string;
  }[] = [];
  private _baseUrl: string | null;
  private _withCredentials: boolean;

  constructor(private _http: HttpClient) {
  }

  public get baseUrl(): string | null {
    return this._baseUrl;
  }

  public registerBaseUrl(baseUrl: string): void {
    this._baseUrl = baseUrl;

    if (this._baseUrl[this._baseUrl.length - 1] !== '/') {
      this._baseUrl += '/';
    }
  }

  public deRegisterBaseUrl(): void {
    this._baseUrl = null;
  }

  public setWithCredentials(status: boolean): void {
    this._withCredentials = status;
  }

  public registerGlobalHeader(header: HttpHeader): void {
    this.deregisterGlobalHeader(header.key);

    this._globalHeaders.push(header);
  }

  public getGlobalHeaders(): HttpHeader[] {
    return this._globalHeaders;
  }

  public deregisterGlobalHeader(headerKey: string | null | undefined): boolean {
    const indexOfHeader = this._globalHeaders.findIndex(header => header.key === headerKey);

    if (indexOfHeader === -1) {
      return false;
    }

    this._globalHeaders.splice(indexOfHeader, 1);

    return true;
  }

  public removeAllRegisteredGlobalHeaders(): void {
    this._globalHeaders.length = 0;
  }

  public registerRequestInterceptor(requestInterceptor: IRequestInterceptor): void {
    this._requestInterceptors.push(requestInterceptor);
  }

  public deregisterRequestInterceptor(requestInterceptor: IRequestInterceptor): boolean {
    const indexOfItem = this._requestInterceptors.indexOf(requestInterceptor);

    if (indexOfItem === -1) {
      return false;
    }

    this._requestInterceptors.splice(indexOfItem, 1);

    return true;
  }

  public registerResponseInterceptor(responseInterceptor: IResponseInterceptor): void {
    this._responseInterceptors.push(responseInterceptor);
  }

  public deregisterResponseInterceptor(responseInterceptor: IResponseInterceptor): boolean {
    const indexOfItem = this._responseInterceptors.indexOf(responseInterceptor);

    if (indexOfItem === -1) {
      return false;
    }

    this._responseInterceptors.splice(indexOfItem, 1);

    return true;
  }

  public sendCookieValueInCustomHeader(cookieName: string, customHeaderName: string): void {
    this._customCookieToHeaders.push({
      cookieName,
      customHeaderName
    });
  }

  public async getAsync<T = any>(url: string, options: RequestOptions = DEFAULT_REQUEST_OPTIONS): Promise<T> {
    const that = this;

    return await that._requestCoreAsync<T>(url, 'GET', null, options, (innerUrl, data, modOptions) => {
      return that._http.get(innerUrl, modOptions);
    });
  }

  public async postAsync<T = any, D = any>(url: string, data?: D, options: RequestOptions = DEFAULT_REQUEST_OPTIONS): Promise<T> {
    const that = this;

    return await that._requestCoreAsync<T>(url, 'POST', data, options, (innerUrl, innerData, modOptions) => {
      return that._http.post(innerUrl, innerData, modOptions);
    });
  }

  public async putAsync<T = any, D = any>(url: string, data?: D, options: RequestOptions = DEFAULT_REQUEST_OPTIONS): Promise<T> {
    const that = this;

    return await that._requestCoreAsync<T>(url, 'PUT', data, options, (innerUrl, innerData, modOptions) => {
      return that._http.put(innerUrl, innerData, modOptions);
    });
  }

  public async deleteAsync<T = any>(url: string, options: RequestOptions = DEFAULT_REQUEST_OPTIONS): Promise<T> {
    const that = this;

    return await that._requestCoreAsync<T>(url, 'DELETE', null, options, (innerUrl, data, modOptions) => {
      return that._http.delete(innerUrl, modOptions);
    });
  }

  public async patchAsync<T = any, D = any>(url: string, data?: D, options: RequestOptions = DEFAULT_REQUEST_OPTIONS): Promise<T> {
    const that = this;

    return await that._requestCoreAsync<T>(url, 'PATCH', data, options, (innerUrl, innerData, modOptions) => {
      return that._http.patch(innerUrl, innerData, modOptions);
    });
  }

  public async headAsync<T = any>(url: string, options: RequestOptions = DEFAULT_REQUEST_OPTIONS): Promise<T> {
    const that = this;

    return await that._requestCoreAsync<T>(url, 'HEAD', null, options, (innerUrl, data, modOptions) => {
      return that._http.head(innerUrl, modOptions);
    });
  }

  private async _requestCoreAsync<T = any>(
    url: string,
    method: string,
    data: any,
    options: RequestOptions,
    action: Func<string, any, AngularRequestOptions,
      Observable<HttpResponse<string>>>
  ): Promise<T> {
    url = this._convertUrl(url);

    const modifiedOptions = this._modifyOptions(options);

    const clientHeaders = this._convertAngularHeadersToHttpClientHeaders(<HttpHeaders> modifiedOptions.headers);

    let shouldIntercept = await this._invokeRequestInterceptorsAsync(url, method, data, clientHeaders);

    if (shouldIntercept) {
      throw new Error('Request intercepted');
    }

    modifiedOptions.headers = this._updateAngularHeadersFromHttpClientHeaders(clientHeaders, <HttpHeaders> modifiedOptions.headers);

    let response: HttpResponse<string>;

    try {
      const actionResponse = await firstValueFrom(action(url, data, modifiedOptions));

      if (!actionResponse) {
        throw new Error('No response');
      }

      response = actionResponse;
    } catch (errorResponse) {
      response = errorResponse;
    }

    shouldIntercept = await this._invokeResponseInterceptorsAsync(response, url, method, data, clientHeaders);

    if (shouldIntercept) {
      throw new Error('Response intercepted');
    }

    if (!response.ok) {
      throw new HttpError(method, url, response.status, response.statusText, JSON.stringify(response.body));
    }

    let returnValue;

    try {
      returnValue = response.body ? JSON.parse(response.body) : null;
    } catch (e) {
      returnValue = { data: response.body };
    }

    return <T> returnValue;
  }

  public getObservable<T = any>(url: string, options: RequestOptions = DEFAULT_REQUEST_OPTIONS): Observable<T> {
    const that = this;

    return that._requestCoreObservable<T>(url, 'GET', null, options, (innerUrl, data, modOptions) => {
      return that._http.get(innerUrl, modOptions);
    });
  }

  public postObservable<T = any, D = any>(url: string, data: D, options: RequestOptions = DEFAULT_REQUEST_OPTIONS): Observable<T> {
    const that = this;

    return that._requestCoreObservable<T>(url, 'POST', data, options, (innerUrl, innerData, modOptions) => {
      return that._http.post(innerUrl, innerData, modOptions);
    });
  }

  public putObservable<T = any, D = any>(url: string, data: D, options: RequestOptions = DEFAULT_REQUEST_OPTIONS): Observable<T> {
    const that = this;

    return that._requestCoreObservable<T>(url, 'PUT', data, options, (innerUrl, innerData, modOptions) => {
      return that._http.put(innerUrl, innerData, modOptions);
    });
  }

  public deleteObservable<T = any>(url: string, options: RequestOptions = DEFAULT_REQUEST_OPTIONS): Observable<T> {
    const that = this;

    return that._requestCoreObservable<T>(url, 'DELETE', null, options, (innerUrl, data, modOptions) => {
      return that._http.delete(innerUrl, modOptions);
    });
  }

  public patchObservable<T = any, D = any>(url: string, data?: D, options: RequestOptions = DEFAULT_REQUEST_OPTIONS): Observable<T> {
    const that = this;

    return that._requestCoreObservable<T>(url, 'PATCH', data, options, (innerUrl, innerData, modOptions) => {
      return that._http.patch(innerUrl, innerData, modOptions);
    });
  }

  public headObservable<T = any>(url: string, options: RequestOptions = DEFAULT_REQUEST_OPTIONS): Observable<T> {
    const that = this;

    return that._requestCoreObservable<T>(url, 'HEAD', null, options, (innerUrl, data, modOptions) => {
      return that._http.head(innerUrl, modOptions);
    });
  }

  private _requestCoreObservable<T = any>(
    url: string,
    method: string,
    data: any,
    options: RequestOptions,
    action: Func<string, any, AngularRequestOptions, Observable<HttpResponse<string>>>
  ): Observable<T> {
    return from(this._requestCoreAsync(url, method, data, options, action));
  }

  private _convertUrl(url: string) {
    let returnUrl = url;

    if (this._baseUrl) {
      returnUrl = this._baseUrl + returnUrl;
    }

    return returnUrl;
  }

  private _modifyOptions(options: RequestOptions): AngularRequestOptions {
    const resultOptions: AngularRequestOptions = {
      headers: options.headers || new HttpHeaders(),
      observe: 'response',
      params: options.params,
      reportProgress: options.reportProgress,
      responseType: 'text',
      withCredentials: options.withCredentials || this._withCredentials,
    };

    options.headers = options.headers || new HttpHeaders();

    resultOptions.headers = this._appendGlobalHeaders(<HttpHeaders> resultOptions.headers);

    resultOptions.headers = this._tryAppendRegisteredCookiesToCustomHeaders(<HttpHeaders> resultOptions.headers);

    return resultOptions;
  }

  private _appendGlobalHeaders(headers: HttpHeaders): HttpHeaders {
    let newHeaders = headers;

    for (const registeredHeader of this._globalHeaders) {
      if (registeredHeader.key && registeredHeader.value) {
        newHeaders = headers.set(registeredHeader.key, registeredHeader.value);
      }
    }

    return newHeaders;
  }

  private _tryAppendRegisteredCookiesToCustomHeaders(headers: HttpHeaders): HttpHeaders {
    let newHeaders = headers;

    for (const cookieToHeader of this._customCookieToHeaders) {
      const cookieValue = this._cookieStore.getCookie(cookieToHeader.cookieName);

      if (cookieValue) {
        newHeaders = headers.set(cookieToHeader.customHeaderName, cookieValue);
      }
    }

    return newHeaders;
  }

  private async _invokeRequestInterceptorsAsync(url: string, method: string, data: any, headers: HttpHeader[]): Promise<boolean> {
    for (const requestInterceptor of this._requestInterceptors) {
      const shouldIntercept = await requestInterceptor.beforeRequestAsync(url, method, data, headers);

      if (shouldIntercept) {
        return true;
      }
    }

    return false;
  }

  private async _invokeResponseInterceptorsAsync(
    response: HttpResponse<string>,
    url: string,
    method: string,
    data: any,
    headers: HttpHeader[]
  ): Promise<boolean> {
    for (const responseInterceptor of this._responseInterceptors) {
      const shouldIntercept = await responseInterceptor.afterResponseAsync(response, url, method, data, headers);

      if (shouldIntercept) {
        return true;
      }
    }

    return false;
  }

  private _convertAngularHeadersToHttpClientHeaders(headers: HttpHeaders): HttpHeader[] {
    return headers.keys().map(headerKey => {
      return new HttpHeader(headerKey, headers.get(headerKey) || '');
    });
  }

  private _updateAngularHeadersFromHttpClientHeaders(httpClientHeaders: HttpHeader[], headers: HttpHeaders): HttpHeaders {
    let newHeaders = headers;

    for (const clientHeader of httpClientHeaders) {
      const headerValue = headers.get(clientHeader.key);

      if (headerValue !== clientHeader.value) {
        newHeaders = headers.set(clientHeader.key, clientHeader.value);
      }
    }

    return newHeaders;
  }
}
