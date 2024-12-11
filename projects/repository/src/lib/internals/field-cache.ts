import { ɵCache } from './cache';
import { Observable } from 'rxjs';

type ɵRepositoryFieldSelector = string;

export class ɵFieldCache {
  private _cache = new Map<ɵRepositoryFieldSelector, ɵCache>();

  constructor(
    public readonly name: string,
    public readonly maxAgeInMS: number,
    private readonly _cacheValueProvider: (args: any[]) => any,
  ) {
  }

  public getValueByArgs(args: any[]): Observable<any> {
    const selector = ɵFieldCache._generateCacheSelector(args);

    let fieldCache = this._cache.get(selector);

    if (!fieldCache) {
      fieldCache = new ɵCache(
        this.maxAgeInMS,
        () => this._cacheValueProvider(args),
      );

      this._cache.set(selector, fieldCache);
    }

    return fieldCache.value;
  }

  private static _generateCacheSelector(args: any[]): ɵRepositoryFieldSelector {
    return (args.length ? JSON.stringify(args) : '');
  }
}
