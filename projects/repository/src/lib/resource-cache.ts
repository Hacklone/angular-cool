import { BehaviorSubject, firstValueFrom, ReplaySubject } from 'rxjs';

export class ResourceCache<TItem> {
  private _valueSubject = new ReplaySubject<TItem | undefined>(1);

  private _isLoading = false;
  private _isLoadingSubject = new BehaviorSubject<boolean>(false);

  private _validUntil: number | null = null;

  public get isInvalid(): boolean {
    return this._validUntil === null || Date.now() > this._validUntil;
  }

  constructor(
    private loader: () => Promise<TItem | undefined>,
    private maxAge: number,
  ) {
  }

  public getValueObservable() {
    return this._valueSubject.asObservable();
  }

  public isLoadingObservable() {
    return this._isLoadingSubject.asObservable();
  }

  public async keepDataFreshAsync() {
    if (!this.isInvalid) {
      return;
    }

    await this._reloadValueAsync();
  }

  private async _reloadValueAsync(): Promise<void> {
    if (this._isLoading) {
      await firstValueFrom(this._isLoadingSubject);

      return;
    }

    this._setIsLoading(true);

    try {
      const data = await this.loader();

      await this.setValueAsync(data);
    } finally {
      this._setIsLoading(false);
    }
  }

  public async setValueAsync(value: TItem | undefined) {
    this._validUntil = Date.now() + this.maxAge;
    this._valueSubject.next(value);
  }

  public async getValueAsync(): Promise<TItem | undefined> {
    await this.keepDataFreshAsync();

    return firstValueFrom(this._valueSubject);
  }

  public invalidate() {
    this._validUntil = null;
  }

  private _setIsLoading(isLoading: boolean) {
    this._isLoading = isLoading;
    this._isLoadingSubject.next(isLoading);
  }
}
