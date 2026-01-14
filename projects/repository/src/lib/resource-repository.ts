import { computed, Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ResourceCache } from './resource-cache';
import { ResourceRepositorySignal } from '../interface/resource-repository-signal.interface';
import { ResourceRepository, ResourceRepositoryOptions } from '../interface/resource-repository.interface';
import { map, switchMap, tap } from 'rxjs';

const DEFAULT_MAX_AGE = 5 * 60 * 1000;

type CacheKey = string;

export class ResourceRepositoryImpl<TParams, TItem> implements ResourceRepository<TParams, TItem> {
  private _cacheStore = new Map<CacheKey, ResourceCache<TItem>>();

  constructor(private options: ResourceRepositoryOptions<TParams, TItem>) {
  }

  public get(key: Signal<TParams>): ResourceRepositorySignal<TItem | undefined> {
    const cacheObservable = toObservable(key)
      .pipe(
        map(keyValue => {
          const cacheKey = this._createCacheKey(keyValue);

          let cache = this._cacheStore.get(cacheKey);

          if (!cache) {
            cache = new ResourceCache(
              ((p) => () => this.options.loader(p))(keyValue),
              this.options.maxAge ?? DEFAULT_MAX_AGE,
            );

            this._cacheStore.set(cacheKey, cache);
          }

          return cache;
        }),
      );

    const resultSignal = toSignal(
      cacheObservable
        .pipe(
          tap(cache => {
            // Do not wait for it to load
            cache.keepDataFreshAsync();
          }),
          switchMap(_ => _.getValueObservable()),
        ),
      {
        equal: () => false,
      }
    );

    const isLoadingSignal = toSignal(
      cacheObservable
        .pipe(
          switchMap(_ => _.isLoadingObservable()),
        )
    );

    return Object.assign(resultSignal, {
      reload: async () => {
        await this.reload(key());
      },
      set: async (value: TItem | undefined) => {
        await this.setValue(key(), value as TItem);
      },
      update: async (valueUpdater: (currentValue: TItem | undefined) => Promise<TItem | undefined>) => {
        await this.updateValue(key(), valueUpdater);
      },
      remove: async () => {
        await this.remove(key());
      },
      isLoading: computed<boolean>(() => isLoadingSignal() ?? true),
    } satisfies Omit<ResourceRepositorySignal<TItem | undefined>, keyof Signal<TItem | undefined>>);
  }

  public async remove(key: TParams): Promise<void> {
    const cacheKey = this._createCacheKey(key);

    const cache = this._cacheStore.get(cacheKey);

    if (!cache) {
      throw new Error(`No cache found for the given key: ${key}`);
    }

    await cache.removeAsync();

    this._cacheStore.delete(cacheKey);
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

  public async setValue(key: TParams, value: TItem | undefined): Promise<void> {
    const cacheKey = this._createCacheKey(key);

    let cache = this._cacheStore.get(cacheKey);

    if (!cache) {
      throw new Error(`No cache found for the given key: ${key}`);
    }

    await cache.setValueAsync(value);
  }

  public async updateValue(key: TParams, updateFn: (value: TItem | undefined) => Promise<TItem | undefined>): Promise<void> {
    const value = await this.getValue(key);

    await this.setValue(key, await updateFn(value));
  }

  private _createCacheKey(params: TParams): CacheKey {
    return (this.options.cacheKeyGenerator ?? JSON.stringify)(params) as CacheKey;
  }
}
