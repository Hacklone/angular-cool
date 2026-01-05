import { Observable, ReplaySubject } from 'rxjs';

export class ɵCache {
  private _valueSubject = new ReplaySubject(1);
  private _lastValueDateInMS: number = 0;

  constructor(
    public readonly maxAge: number,
    private readonly _cacheValueProvider: () => Promise<any>,
  ) {
  }

  public get value(): Observable<any> {
    if ((new Date().getTime() - this._lastValueDateInMS) > this.maxAge) {
      // Do not wait
      this.loadValueAsync();
    }

    return this._valueSubject.asObservable();
  }

  public invalidate() {
    this._lastValueDateInMS = 0;
  }

  public async loadValueAsync() {
    const value = await this._cacheValueProvider();

    this.setValue(value);
  }

  public setValue(value: any) {
    this._lastValueDateInMS = new Date().getTime();
    this._valueSubject.next(value);
  }

  public invalidateAndLoad() {
    this.invalidate();

    // Do not wait
    this.loadValueAsync();
  }
}
