import { Observable, Subscribable } from 'rxjs';
import { computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

export function fromRepository<T>(
  computation: () => Observable<T> | Subscribable<T>,
) {
  return computed(() => toSignal(computation()));
}
