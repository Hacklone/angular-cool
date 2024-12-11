import { ɵFieldCache } from '../internals/field-cache';

export type ɵRepositoryClass<T = any> = new (...args: any[]) => T;

export type ɵRepositoryFieldCacheKey = string;

export interface ɵRepositoryClassInternal {
  ɵcache: Map<ɵRepositoryFieldCacheKey, ɵFieldCache>;
}
