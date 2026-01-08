import { ResourceRepository, ResourceRepositoryOptions } from './interface/resource-repository.interface';
import { ResourceRepositoryImpl } from './lib/resource-repository';

export * from './interface/resource-repository-signal.interface';
export * from './interface/resource-repository.interface';

/**
 * Creates a new instance of a ResourceRepository with the specified options.
 *
 * @param {ResourceRepositoryOptions<TParams, TItem>} options - The configuration options for the resource repository.
 * @return {ResourceRepository<TParams, TItem>} A new instance of ResourceRepository configured with the given options.
 */
export function resourceRepository<TParams, TItem>(options: ResourceRepositoryOptions<TParams, TItem>): ResourceRepository<TParams, TItem> {
  return new ResourceRepositoryImpl<TParams, TItem>(options);
}
