[npm-url]: https://npmjs.org/package/@angular-cool/inline-edit-field
[npm-image]: https://img.shields.io/npm/v/@angular-cool/inline-edit-field.svg
[downloads-image]: https://img.shields.io/npm/dm/@angular-cool/inline-edit-field.svg
[total-downloads-image]: https://img.shields.io/npm/dt/@angular-cool/inline-edit-field.svg

# @angular-cool/inline-edit-field [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]  [![Total Downloads][total-downloads-image]][npm-url]
Cool inline edit field for angular

<img src="https://image.ibb.co/czt6FU/Screen_Shot_2018_09_08_at_0_33_05.png" width="300">
<img src="https://image.ibb.co/eQi6FU/Screen_Shot_2018_09_08_at_0_34_02.png" width="300">

## Install 
> npm install --save @angular-cool/inline-edit-field

## Install peer dependencies
> npm install --save @fortawesome/angular-fontawesome
>
> npm install --save @fortawesome/fontawesome-svg-core
>
> npm install --save @fortawesome/free-regular-svg-icons
>
> npm install --save @fortawesome/free-solid-svg-icons

## Setup
```javascript
import { NgModule } from '@angular/core';
import { CoolInlineEditFieldModule } from '@angular-cool/inline-edit-field';

@NgModule({
    imports: [CoolInlineEditFieldModule]
})
export class MyAppModule {}
```

## Usage
```html
<cool-inline-edit-field name="name"
                        [ngModel]="user.name"
                        (saved)="saveUserNameAsync($event)">
</cool-inline-edit-field>
```

## API
### Inputs
* \[hideIndicator]
    - Type: boolean 
    - Hide edit indicators
  
* \[placeholder]
    - Type: string 
    - Placeholder text for the input
  
* \[emptyText]
    - Type: string 
    - Text shown when value is empty
  
* \[fontSize]
    - Type: string 
    - Font size of input
   
* \[type]
    - Type: string  
    - Type of input

### Outputs
* \(saved)
    - Type: string
    - Called when a new value is to be saved
    
* \(editStarted)
    - Type: string
    - Called when inline edit field goes into edit mode
    
* \(editStopped)
    - Type: string
    - Called when inline edit field goes out of edit mode 

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
