import { ReplaySubject } from 'rxjs';

export class ResourceCache<TItem> {
  private _subject = new ReplaySubject<TItem | undefined>();
  private _validUntil: number | null = null;

  public get isInvalid(): boolean {
    return this._validUntil === null || Date.now() > this._validUntil;
  }

  constructor(
    private loader: () => Promise<TItem | undefined>,
    private maxAge: number,
  ) {
  }

  public getObservable() {
    return this._subject.asObservable();
  }

  public async keepDataFreshAsync() {
    if (!this.isInvalid) {
      return;
    }

    const data = await this.loader();

    await this.setValueAsync(data);
  }

  public async setValueAsync(value: TItem | undefined) {
    this._validUntil = Date.now() + this.maxAge;
    this._subject.next(value);
  }

  public invalidate() {
    this._validUntil = null;
  }
}
