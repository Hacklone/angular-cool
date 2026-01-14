import { Signal } from '@angular/core';

export interface ResourceRepositorySignal<T> extends Signal<T> {
  /**
   * Reloads or refreshes the current value.
   */
  readonly reload: () => Promise<void>;

  /**
   * Sets current value.
   */
  readonly set: (value: T | undefined) => Promise<void>;

  /**
   * Updates current value.
   */
  readonly update: (valueUpdater: (current: T | undefined) => Promise<T | undefined>) => Promise<void>;

  /**
   * Removes current resource
   */
  readonly remove: () => Promise<void>;

  /**
   * true if resource is currently loading.
   */
  readonly isLoading: Signal<boolean>;
}
