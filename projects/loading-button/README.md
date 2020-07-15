[npm-url]: https://npmjs.org/package/@angular-cool/loading-button
[npm-image]: https://img.shields.io/npm/v/@angular-cool/loading-button.svg
[downloads-image]: https://img.shields.io/npm/dm/@angular-cool/loading-button.svg
[total-downloads-image]: https://img.shields.io/npm/dt/@angular-cool/loading-button.svg

# @angular-cool/loading-button [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]  [![Total Downloads][total-downloads-image]][npm-url]
Cool button with loading indicator for angular

## Install 
> npm install --save @angular-cool/loading-button

## Setup
```javascript
import { NgModule } from '@angular/core';
import { CoolLoadingButtonModule } from '@angular-cool/loading-button';

@NgModule({
    imports: [CoolLoadingButtonModule]
})
export class MyAppModule {}
```

## Usage
```typescript
async myAsyncFunction(parameters: any): Promise<any> {
  // Do something async
}
```

```html
<cool-loading-button [clickHandler]="myAsyncFunction"
                     [clickParameters]="{ parametersPassToTheFunction: 'test' }">
  Click me
</cool-loading-button>
```

## API
### Inputs
* \[clickHandler]
    - Type: (parameters: any) => Promise<any> | any 
    - Async function to run when the button is clicked

* \[clickParameters]
    - Type: any 
    - Parameter to be passed when invoking the clickHandler function

* \[color]
    - Type: ThemePalette 
    - Color of the Material Button

* \[spinnerColor]
    - Type: ThemePalette 
    - Color of the MatSpinner in the button
  
* \[disabled]
    - Type: boolean 
    - Whether the button is disabled
 

### Outputs
* \(loadingChanged)
    - Type: boolean
    - Called when the loading state has changed
    
* \(loadingFinished)
    - Type: void
    - Called when the loading has finished / stopped

## License
> The MIT License (MIT)

> Copyright (c) 2020 Hacklone
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
