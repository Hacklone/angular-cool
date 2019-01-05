[npm-url]: https://npmjs.org/package/@angular-cool/virtual-grid
[npm-image]: https://img.shields.io/npm/v/@angular-cool/virtual-grid.svg
[downloads-image]: https://img.shields.io/npm/dm/@angular-cool/virtual-grid.svg
[total-downloads-image]: https://img.shields.io/npm/dt/@angular-cool/virtual-grid.svg

# @angular-cool/virtual-grid [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]  [![Total Downloads][total-downloads-image]][npm-url]
Cool virtual scroll grid for angular

## Install 
> npm install --save @angular-cool/virtual-grid

## Setup
```typescript
import { NgModule } from '@angular/core';
import { CoolVirtualGridModule } from '@angular-cool/virtual-grid';

@NgModule({
    imports: [CoolVirtualGridModule]
})
export class MyAppModule {}
```

## Usage
```typescript
import { Component } from '@angular/core';
import { HttpClient } from '@angular/http';
import { AsyncIterator } from '@angular-cool/virtual-grid';

@Component({
    selector: 'my-app',
    template: `
        <cool-virtual-grid [itemIterator]="myItemIterator" [itemHeight]="40" [itemWidth]="35" [itemSpace]="5">
            <ng-template let-item>
                <img [src]="item.imageUrl">
                <div>{{ item.name }}</div>
            </ng-template>
        </cool-virtual-grid>
    `
})
export class MyAppComponent {
    constructor(private _http: HttpClient) {
        this.myItemIterator = {
            next: async (fromIndex, length) => {
                const values = await this._http.get(`/api/items?from${fromIndex}&length=${length}`).toPromise();
              
                return {
                    done: false,
                    value: values,
                };
            }
        };
    }
    
    public myItemIterator: AsyncIterator<any>;
}
```

Place the `cool-virtual-grid-container` attribute on any html element. This element will be the scrolling container.

>Note: `cool-virtual-grid-container` won't work on the `<body>` element as the body element cannot be scrolled.

```html 
<html cool-virtual-grid-container>
```

## API
- `[itemIterator]: AsyncIterator<PromiseLike<any> | Array<any>>`
  - required
  - iterator with which the virtual grid gets data to be shown
- `[itemWidth]: number`
  - required
  - item width in pixels
- `[itemHeight]: number`
  - required
  - item height in pixels
- `[itemSpace]: number`
  - required
  - space between the grid items in pixels
- `[bodyScroll]: boolean`
  - whether the scroll container is the body. When set the cool-virtual-grid-container attribute is not required
- `reRenderAsync(): Promise<void>`
  - refreshes the grid. Useful when something changes in the background
- `resetAsync(): Promise<void>`
  - resets scroll position and calls `reRenderAsync()`

## License
> The MIT License (MIT)

> Copyright (c) 2018 Hacklone
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
