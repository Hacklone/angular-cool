[npm-url]: https://npmjs.org/package/@angular-cool/dialogs
[npm-image]: https://img.shields.io/npm/v/@angular-cool/dialogs.svg
[downloads-image]: https://img.shields.io/npm/dm/@angular-cool/dialogs.svg
[total-downloads-image]: https://img.shields.io/npm/dt/@angular-cool/dialogs.svg

# @angular-cool/dialogs [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]  [![Total Downloads][total-downloads-image]][npm-url]
Cool dialogs in angular

## Install 
> npm install --save @angular-cool/dialogs

## Setup
```javascript
import { NgModule } from '@angular/core';
import { CoolDialogsModule } from '@angular-cool/dialogs';

@NgModule({
    imports: [
        CoolDialogsModule.forRoot(),
    ]
})
export class MyAppModule {}
```

## Usage
```typescript
import { Component, OnInit } from '@angular/core';

import { CoolDialogService } from '@angular-cool/dialogs';

@Component({
  selector: 'my-app',
  //...
})
export class AppComponent implements OnInit {    
    constructor(private _dialogsService: CoolDialogService) {
    }
    
    async onDeleteButtonClickAsync(item: Item) {
        const result = await this._dialogsService.showDialog({
          titleText: 'Dialog title',
          questionText: `Are you sure you want to delete "${ item.name }"?`,
          confirmActionButtonText: 'Delete',
          cancelActionButtonText: 'Cancel',
          confirmActionButtonColor: 'warn',
          textConfirmation: 'Optional text validation'
        });
        
        if (result.isConfirmed) {
          await this._deleteItem(item);
        }
    }
}
```

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
