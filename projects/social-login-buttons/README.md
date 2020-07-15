[npm-url]: https://npmjs.org/package/@angular-cool/social-login-buttons
[npm-image]: https://img.shields.io/npm/v/@angular-cool/social-login-buttons.svg
[downloads-image]: https://img.shields.io/npm/dm/@angular-cool/social-login-buttons.svg
[total-downloads-image]: https://img.shields.io/npm/dt/@angular-cool/social-login-buttons.svg

# @angular-cool/social-login-buttons [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]  [![Total Downloads][total-downloads-image]][npm-url]
Cool social login buttons for angular

## Install 
> npm install --save @angular-cool/social-login-buttons

## Setup
```javascript
import { NgModule } from '@angular/core';
import { CoolLoadingButtonModule } from '@angular-cool/social-login-buttons';

@NgModule({
    imports: [CoolSocialLoginButtonsModule]
})
export class MyAppModule {}
```

## Google button

### Usage

```html
<cool-google-button style="dark" (click)="onGoogleLoginClicked()">
  Login with Google
</cool-google-button>
```

### API
#### Inputs
* \[style]
    - Type: 'dark' | 'light' 
    - Style of the button
  
* \[disabled]
    - Type: boolean 
    - Whether the button is disabled
 
#### Outputs
* \(click)
    - Type: MouseEvent
    - Called when the button has been clicked

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
