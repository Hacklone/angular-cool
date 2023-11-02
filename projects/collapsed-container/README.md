[npm-url]: https://npmjs.org/package/@angular-cool/collapsed-container
[npm-image]: https://img.shields.io/npm/v/@angular-cool/collapsed-container.svg
[downloads-image]: https://img.shields.io/npm/dm/@angular-cool/collapsed-container.svg
[total-downloads-image]: https://img.shields.io/npm/dt/@angular-cool/collapsed-container.svg

# @angular-cool/collapsed-container [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]  [![Total Downloads][total-downloads-image]][npm-url]
Cool collapsed container in angular

<img src="https://i.ibb.co/4WksJnG/collapsed-container.gif" alt="collapsed-container">

## Install 
> npm install --save @angular-cool/collapsed-container

## Usage
```typescript
import { Component, OnInit } from '@angular/core';

import { CoolCollapsedContainer } from '@angular-cool/collapsed-container';

@Component({
  imports: [
    CoolCollapsedContainer,
  ],
  template: `
    <cool-collapsed-container collapsedMaxHeight="500px">
      <div>
        Your content here
      </div>
    </cool-collapsed-container>
  `
})

```

## License
> The MIT License (MIT)

> Copyright (c) 2023 Hacklone
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
