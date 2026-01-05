import { Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ResourceCache } from './resource-cache';

const DEFAULT_MAX_AGE = 5 * 60 * 1000;

type CacheKey = string;

export type ReloadableSignal<T> = Signal<T> & { reload: () => Promise<void> };

class ResourceRepository<TParams, TItem> {
  private _cacheStore = new Map<CacheKey, ResourceCache<TItem>>();

  constructor(private options: ResourceRepositoryOptions<TParams, TItem>) {
  }

  /**
   * Retrieves a resource cache
   *
   * @param {Signal<TParams>} key - A signal function used to resolve the parameters for retrieving or initializing the resource.
   * @return {ReloadableSignal<TItem | undefined>} A read-only signal containing the item associated with the provided key, already cached.
   */
  public get(key: Signal<TParams>): ReloadableSignal<TItem | undefined> {
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

        return cache.getObservable();
      }
    });

    const resultSignal = resource.asReadonly().value as ReloadableSignal<TItem | undefined>;

    resultSignal.reload = async () => {
      await this.reload(key());
    };

    return resultSignal;
  }

  /**
   * Reloads the cache associated with the given key, ensuring it is updated with fresh data.
   *
   * @param {TParams} key - The key used to identify the specific cache entry to reload.
   * @return {Promise<void>} A promise that resolves when the cache has been refreshed.
   * @throws {Error} If no cache is found for the provided key or if data loading fails.
   */
  public async reload(key: TParams): Promise<void> {
    const cacheKey = this._createCacheKey(key);

    const cache = this._cacheStore.get(cacheKey);

    if (!cache) {
      throw new Error(`No cache found for the given key: ${key}`);
    }

    cache.invalidate();

    await cache.keepDataFreshAsync();
  }

  private _createCacheKey(params: TParams): CacheKey {
    return (this.options.cacheKeyGenerator ?? JSON.stringify)(params) as CacheKey;
  }
}

/**
 * Configuration options for a ResourceRepository.
 * This interface provides options for customizing the behavior
 * of resource loading and caching mechanisms.
 *
 * @template TParams The type of the parameters used to load a resource.
 * @template TItem The type of the items being loaded or cached.
 *
 * @property loader A function responsible for loading a resource. It receives
 * parameters of type `TParams` and returns a Promise resolving to an item of type `TItem`.
 *
 * @property [maxAge] Optional. Specifies the maximum duration (in milliseconds)
 * for which a cached resource remains valid. Default: 5 minutes
 *
 * @property [cacheKeyGenerator] Optional. A function used to generate a unique
 * cache key based on the input parameters of type `TParams`. Default: JSON.stringify()
 */
export interface ResourceRepositoryOptions<TParams, TItem> {
  loader: (params: TParams) => Promise<TItem>;

  maxAge?: number;

  cacheKeyGenerator?: (params: TParams) => string;
}

/**
 * Creates a new instance of a ResourceRepository with the specified options.
 *
 * @param {ResourceRepositoryOptions<TParams, TItem>} options - The configuration options for the resource repository.
 * @return {ResourceRepository<TParams, TItem>} A new instance of ResourceRepository configured with the given options.
 */
export function resourceRepository<TParams, TItem>(options: ResourceRepositoryOptions<TParams, TItem>): ResourceRepository<TParams, TItem> {
  return new ResourceRepository<TParams, TItem>(options);
}
