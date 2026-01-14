import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface RequestOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[] | undefined;
  };
  params?: HttpParams | {
    [param: string]: string | string[] | undefined;
  };
  reportProgress?: boolean;
  withCredentials?: boolean;
}

export const DEFAULT_REQUEST_OPTIONS: RequestOptions = {};
