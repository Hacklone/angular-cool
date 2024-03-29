export class CoolServerStorage {
  private _storageObject: any;

  public constructor() {
    this._storageObject = {};
  }

  public getItem(key: string): string | null {
    return this._storageObject[key] || null;
  }

  public setItem(key: string, value: string): void {
    this._storageObject[key] = value;
  }

  public removeItem(key: string): void {
    this._storageObject[key] = undefined;
  }

  public key(index: number): string | null {
    return this._storageObject.key(index) || null;
  }

  public clear(): void {
    this._storageObject = {};
  }

  public get length(): number {
    return Object.keys(this._storageObject).length;
  }
}
