import { Signal } from '@angular/core';

export interface ResourceRepositorySignal<T> extends Signal<T> {
  /**
   * Reloads or refreshes the current value.
   */
  readonly reload: () => Promise<void>;

  /**
   * Sets current value.
   */
  readonly set: (value: T) => Promise<void>;
}
