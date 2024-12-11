import { ɵRepositoryClass, ɵRepositoryClassInternal } from '../interface/repository.interface';

export function Repository() {
  return (target: ɵRepositoryClass) => {
    if (typeof target !== 'object') {
      throw new Error('Use @Repository() decorator on a class!');
    }

    const repositoryClass: ɵRepositoryClassInternal = target;

    repositoryClass.ɵcache = new Map();
  };
}
