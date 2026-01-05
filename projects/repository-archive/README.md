[npm-url]: https://npmjs.org/package/@angular-cool/repository
[npm-image]: https://img.shields.io/npm/v/@angular-cool/repository.svg
[downloads-image]: https://img.shields.io/npm/dm/@angular-cool/repository.svg
[total-downloads-image]: https://img.shields.io/npm/dt/@angular-cool/repository.svg

# @angular-cool/repository [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]  [![Total Downloads][total-downloads-image]][npm-url]
Cool stateful repository for angular

## Install
> npm install --save @angular-cool/repository

## Setup
```typescript
import { provideRepository } from '@angular-cool/repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRepository([
      MyRepository1,
      MyRepository2,
    ]),
  ]
};
```

## Usage

### Create a Repository

```typescript
import { Repository } from '@angular-cool/repository';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MyRepository1<MyItem> extends Repository<MyItem> {
  private _http = inject(HttpClient);

  public async getOne(id: MyItemID): Observable<MyItem> {
    return await this._http.get(`https://myapi.com/items/${ id }`);
  }
}
```

### Query from repository
```typescript
import { fromRepository } from '@angular-cool/repository';
import { signal } from '@angular/common';

export class MyComponent {
  private idParam = signal('1');

  protected myItem = fromRepository(() => MyRepository1.getOne(this.isParam()));
}
```



## License
> The MIT License (MIT)

> Copyright (c) 2024 Hacklone
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
