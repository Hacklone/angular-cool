import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChildren } from '@angular/core';
import { CoolWizardStepChangeEvent } from './cool-wizard-step-change-event.interface';
import { CoolWizardStepComponent } from './cool-wizard-step.component';
import { WINDOW_REF } from './cool-wizard.module';

@Component({
  selector: 'cool-wizard',
  template: `
    <div id="cool-wizard">
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class CoolWizardComponent implements OnInit {
  private _currentStepIndex: number = 0;

  constructor(@Inject(WINDOW_REF) private _window: Window) {
  }

  @Input()
  public set stepIndex(stepIndex: number) {
    this.setStepIndex(stepIndex);
  }

  @Output()
  public stepIndexChange = new EventEmitter<CoolWizardStepChangeEvent>();

  @ViewChildren(CoolWizardStepComponent)
  public steps: CoolWizardStepComponent[];

  ngOnInit() {
  }

  public nextStep() {
    this.setStepIndex(this._currentStepIndex + 1);
  }

  public previousStep() {
    this.setStepIndex(this._currentStepIndex - 1);
  }

  public setStepIndex(stepIndex: number) {
    const stepsCount = this.steps.length;

    const roundedStepIndex = Math.round(stepIndex);

    let chosenStepIndex = roundedStepIndex;

    if (roundedStepIndex >= this.steps.length) {
      chosenStepIndex = roundedStepIndex % this.steps.length;
    } else if (roundedStepIndex < 0) {
      chosenStepIndex = stepsCount - (Math.abs(this._currentStepIndex + roundedStepIndex) % stepsCount);
    }

    this._currentStepIndex = chosenStepIndex;

    const currentStep = this.steps[this._currentStepIndex];

    this._scrollToStep(currentStep);

    this.stepIndexChange.emit({
      value: currentStep.value,
    });
  }

  private _scrollToStep(step: CoolWizardStepComponent) {
    step.element.nativeElement.scrollIntoView({
      behavior: 'smooth'
    });
  }
}
