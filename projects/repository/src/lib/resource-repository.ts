import { Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ResourceCache } from './resource-cache';
import { ResourceRepositorySignal } from '../interface/resource-repository-signal.interface';
import { ResourceRepository, ResourceRepositoryOptions } from '../interface/resource-repository.interface';

const DEFAULT_MAX_AGE = 5 * 60 * 1000;

type CacheKey = string;

export class ResourceRepositoryImpl<TParams, TItem> implements ResourceRepository<TParams, TItem> {
  private _cacheStore = new Map<CacheKey, ResourceCache<TItem>>();

  constructor(private options: ResourceRepositoryOptions<TParams, TItem>) {
  }

  public get(key: Signal<TParams>): ResourceRepositorySignal<TItem | undefined> {
    const resource = rxResource<TItem | undefined, TParams>({
      params: () => key(),
      stream: ({ params }) => {
        const cacheKey = this._createCacheKey(params);

        let cache = this._cacheStore.get(cacheKey);

        if (!cache) {
          cache = new ResourceCache(
            ((p) => () => this.options.loader(p))(params),
            this.options.maxAge ?? DEFAULT_MAX_AGE,
          );

          this._cacheStore.set(cacheKey, cache);
        }

        // Do not wait for it to load
        cache.keepDataFreshAsync();

        return cache.getValueObservable();
      }
    });

    return Object.assign(resource.asReadonly().value as ResourceRepositorySignal<TItem | undefined>, {
      reload: async () => {
        await this.reload(key());
      },
      set: async (value: TItem | undefined) => {
        await this.setValue(key(), value as TItem);
      }
    });
  }

  public async reload(key: TParams): Promise<void> {
    const cacheKey = this._createCacheKey(key);

    const cache = this._cacheStore.get(cacheKey);

    if (!cache) {
      throw new Error(`No cache found for the given key: ${key}`);
    }

    cache.invalidate();

    await cache.keepDataFreshAsync();
  }

  public async getValue(key: TParams): Promise<TItem | undefined> {
    const cacheKey = this._createCacheKey(key);

    const cache = this._cacheStore.get(cacheKey);

    if (!cache) {
      throw new Error(`No cache found for the given key: ${key}`);
    }

    return await cache.getValueAsync();
  }

  public async setValue(key: TParams, value: TItem): Promise<void> {
    const cacheKey = this._createCacheKey(key);

    let cache = this._cacheStore.get(cacheKey);

    if (!cache) {
      throw new Error(`No cache found for the given key: ${key}`);
    }

    await cache.setValueAsync(value);
  }

  public async updateValue(key: TParams, updateFn: (value: TItem | undefined) => Promise<TItem>): Promise<void> {
    const value = await this.getValue(key);

    await this.setValue(key, await updateFn(value));
  }

  private _createCacheKey(params: TParams): CacheKey {
    return (this.options.cacheKeyGenerator ?? JSON.stringify)(params) as CacheKey;
  }
}
