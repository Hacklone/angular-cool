import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'cool-wizard-step',
  template: `
    <div class="cool-wizard-step">
      <ng-content></ng-content>
    </div>
  `
})
export class CoolWizardStepComponent {
  constructor(public element: ElementRef) {

  }

  @Input()
  public value: any;
}
