import { Signal } from '@angular/core';
import { ResourceRepositorySignal } from './resource-repository-signal.interface';

export interface ResourceRepository<TParams, TItem> {
  /**
   * Retrieves a resource cache
   *
   * @param {Signal<TParams>} key - A signal function used to resolve the parameters for retrieving or initializing the resource.
   * @return {ResourceRepositorySignal<TItem | undefined>} A read-only signal containing the item associated with the provided key, already cached.
   */
  get(key: Signal<TParams>): ResourceRepositorySignal<TItem | undefined>;

  /**
   * Reloads the cache associated with the given key, ensuring it is updated with fresh data.
   *
   * @param {TParams} key - The key used to identify the specific cache entry to reload.
   * @return {Promise<void>} A promise that resolves when the cache has been refreshed.
   * @throws {Error} If no cache is found for the provided key or if data loading fails.
   */
  reload(key: TParams): Promise<void>;

  /**
   * Retrieves a value from the cache associated with the specified key.
   *
   * @param {TParams} key - The key used to identify the cache entry.
   * @return {Promise<TItem | undefined>} A promise that resolves with the retrieved value
   * or undefined if the value does not exist.
   * @throws {Error} If no cache is found for the given key.
   */
  getValue(key: TParams): Promise<TItem | undefined>;

  /**
   * Sets a value in the cache associated with the given key and update all value subscribers
   *
   * @param {TParams} key - The unique key used to identify the cache.
   * @param {TItem} value - The value to be stored in the cache
   * @return {Promise<void>} A promise that resolves when the value is successfully set.
   */
  setValue(key: TParams, value: TItem): Promise<void>;

  /**
   * Updates the value associated with the given key by applying an update function and update all value subscribers
   *
   * @param {TParams} key - The key whose value needs to be updated.
   * @param {function(value: TItem | undefined): Promise<TItem>} updateFn - An asynchronous function that takes the current value (or undefined if not present) and returns the updated value.
   * @return {Promise<void>} A promise that resolves when the update operation is complete.
   */
  updateValue(key: TParams, updateFn: (value: TItem | undefined) => Promise<TItem>): Promise<void>;
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
