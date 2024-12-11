import { ɵRepositoryClassInternal } from '../interface/repository.interface';
import { Observable } from 'rxjs';
import { ɵFieldCache } from '../internals/field-cache';

const DEFAULT_MAX_AGE_MS = 60 * 1000;

export function RepositoryField(options?: {
  key?: string;
  maxAge?: number;
}) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => Observable<any>>,
  ): void {
    const originalFunction = descriptor.value;

    if (typeof originalFunction !== 'function') {
      throw new Error('Use @RepositoryField() decorator on functions!');
    }

    const repositoryClass: ɵRepositoryClassInternal = <any> target;

    const fieldKey = options?.key ?? propertyKey;

    const fieldCache = new ɵFieldCache(fieldKey, options?.maxAge ?? DEFAULT_MAX_AGE_MS, originalFunction);

    repositoryClass.ɵcache.set(fieldKey, fieldCache);

    descriptor.value = function(...args: any[]) {
      return fieldCache.getValueByArgs(args);
    };
  };
}
