export interface AsyncIterator<T extends PromiseLike<any> | Array<any>> {
  next(fromIndex: number, numberOfItems: number): IteratedValue<T>
}

export interface IteratedValue<T extends PromiseLike<any> | Array<any>> {
  done: boolean;

  value: T;
}
