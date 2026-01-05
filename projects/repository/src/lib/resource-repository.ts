import { Resource, Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ResourceCache } from './resource-cache';

const DEFAULT_MAX_AGE = 5 * 60 * 1000;

class ResourceRepository<TParams, TItem> {
  private _cacheStore = new Map<TParams, ResourceCache<TItem>>();

  constructor(private options: ResourceRepositoryOptions<TParams, TItem>) {
  }

  /**
   * Retrieves a resource cache
   *
   * @param {Signal<TParams>} key - A signal function used to resolve the parameters for retrieving or initializing the resource.
   * @return {Resource<TItem | undefined>} A read-only resource containing the item associated with the provided key, already cached.
   */
  public get(key: Signal<TParams>): Resource<TItem | undefined> {
    return rxResource<TItem | undefined, TParams>({
      params: () => key(),
      stream: ({ params }) => {
        let cache = this._cacheStore.get(params);

        if (!cache) {
          cache = new ResourceCache(
            ((p) => () => this.options.loader(p))(params),
            this.options.maxAge ?? DEFAULT_MAX_AGE,
          );

          this._cacheStore.set(params, cache);
        }

        // Do not wait for it to load
        cache.keepDataFreshAsync();

        return cache.getObservable();
      }
    }).asReadonly();
  }

  /**
   * Reloads the cache associated with the given key, ensuring it is updated with fresh data.
   *
   * @param {TParams} key - The key used to identify the specific cache entry to reload.
   * @return {Promise<void>} A promise that resolves when the cache has been refreshed.
   * @throws {Error} If no cache is found for the provided key or if data loading fails.
   */
  public async reload(key: TParams): Promise<void> {
    const cache = this._cacheStore.get(key);

    if (!cache) {
      throw new Error(`No cache found for the given key: ${key}`);
    }

    cache.invalidate();

    await cache.keepDataFreshAsync();
  }
}

/**
 * Options to configure the behavior of the ResourceRepository.
 *
 * @template TParams The type of the parameters used by the loader function.
 * @template TItem The type of the items returned by the loader function.
 *
 * @property {function(TParams): Promise<TItem>} loader
 *   A function that loads a resource based on provided parameters and returns a promise that resolves to the resource.
 *
 * @property {number} [maxAge]
 *   The optional maximum age (in milliseconds) for caching the loaded resource. Default: 5 minutes
 */
export interface ResourceRepositoryOptions<TParams, TItem> {
  loader: (params: TParams) => Promise<TItem>;

  maxAge?: number;
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
