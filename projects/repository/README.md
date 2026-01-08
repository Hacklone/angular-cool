[npm-url]: https://npmjs.org/package/@angular-cool/repository

[npm-image]: https://img.shields.io/npm/v/@angular-cool/repository.svg

[downloads-image]: https://img.shields.io/npm/dm/@angular-cool/repository.svg

[total-downloads-image]: https://img.shields.io/npm/dt/@angular-cool/repository.svg

# @angular-cool/repository [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]  [![Total Downloads][total-downloads-image]][npm-url]

Cool stateful signal repository for angular

An easy-to-use signal repository that helps you manage your data loading and caching in your angular applications.

Share data across multiple components and services with automatic reloading and state management.

## Install

> npm install --save @angular-cool/repository

## Usage

### Create a Repository in your service layer

```typescript
import { resourceRepository } from '@angular-cool/repository';
import { inject, Injectable } from '@angular/core';
import { ItemId, ItemDTO } from './my-item.model';

@Injectable()
export class MyService {
  private _http = inject(HttpClient);

  private items = resourceRepository<ItemId, ItemDTO>({
    loader: ({ params }) => this._http.get(`https://myapi.com/items/${params}`).toPromise(),
  });
}
```

### Query from repository

```typescript
import { signal } from '@angular/common';
import { MyService } from './my-service.service';
import { ItemDTO, ItemId } from './my-item.model';

@Component(/*...*/)
export class MyComponent {
  private _myService = inject(MyService);

  private idParam = signal<ItemId>('1' as ItemId);

  protected myItem: Resource<ItemDTO | undefined> = this._myService.items.get(this.idParam);

  protected async updateItem() {
    // Update item on the server here

    await this.myItem.reload(); // This reloads the item from the server and updates the signal for all subscribers
  }
}
```

### Show loading indicator

```html
@if (myItem.isLoading()) {
  <div>Loading</div>
}
```

### Manually update value if needed

```typescript
this.myItem.set(newValue); // Updates the signal for all subscribers
```

OR

```typescript
await this._myService.items.setValue(this.idParam(), myValue); // Updates the signal for all subscribers
```

### Manually get value if needed

```typescript
const value = await this._myService.items.getValue(this.idParam());
```

### Manually update value if needed

```typescript
await this._myService.items.updateValue(this.idParam(), val => {
  // modify val

  return val;
});
```

## License

> The MIT License (MIT)

> Copyright (c) 2025 Hacklone
> https://github.com/Hacklone

> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.
