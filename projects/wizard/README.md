[npm-url]: https://npmjs.org/package/@angular-cool/wizard
[npm-image]: https://img.shields.io/npm/v/@angular-cool/wizard.svg
[downloads-image]: https://img.shields.io/npm/dm/@angular-cool/wizard.svg
[total-downloads-image]: https://img.shields.io/npm/dt/@angular-cool/wizard.svg

# @angular-cool/wizard [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]  [![Total Downloads][total-downloads-image]][npm-url]
Cool generic wizard component for angular

## Install 
> npm install --save @angular-cool/wizard

## Setup
```javascript
import { NgModule } from '@angular/core';
import { CoolWizardModule } from '@angular-cool/wizard';

@NgModule({
    imports: [CoolWizardModule]
})
export class MyAppModule {}
```

## Features

- Full body wizard
- Animated scroll to steps

## API
- \(stepIndexChange\)
- [stepIndex]
- nextStep()
- previousStep()
- setStepIndex(stepIndex: number)

```javascript
import { Component, ViewChild } from '@angular/core';
import { CoolWizard, CoolWizardStepChangeEvent } from '@angular-cool/wizard';

@Component({
  selector: 'my-app',
  template: `
    <cool-wizard (stepChange)="onStepChange($event)">
      <cool-wizard-step [value]="1">
        <h1>Step 1</h1>
        
        <button (click)="goToNextStep()">
          Next step
        </button>
      </cool-wizard-step>
      
      <cool-wizard-step [value]="2">
        <h1>Step 2</h1>
        
        <button (click)="goToPreviousStep()">
          Previous step
        </button>
      </cool-wizard-step>
    </cool-wizard>
  `
})
export class AppComponent {    
    @ViewChild(CoolWizard)
    public wizard: CoolWizard;
    
    public goToNextStep() {
      this.wizard.nextStep();
    }
    
    public goToPreviousStep() {
      this.wizard.nextStep();
    }
    
    public onStepChange(event: CoolWizardStepChangeEvent) {
      console.log(event.value);
    }
}
```

# License
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
