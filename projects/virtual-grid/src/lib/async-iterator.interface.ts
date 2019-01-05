export interface AsyncIterator<T> {
  next(fromIndex: number, numberOfItems: number): PromiseLike<IteratedValue<T>>
}

export interface IteratedValue<T> {
  done: boolean;

  value: T[];
}
