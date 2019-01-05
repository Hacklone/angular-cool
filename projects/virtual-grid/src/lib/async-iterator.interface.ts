export interface AsyncIterator<T extends PromiseLike<any> | Array<any>> {
  next(fromIndex: number, numberOfItems: number): PromiseLike<IteratedValue<T>>
}

export interface IteratedValue<T> {
  done: boolean;

  value: T[];
}
