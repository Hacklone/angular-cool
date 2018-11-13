import { InjectionToken, NgModule } from '@angular/core';
import { CoolWizardComponent } from './cool-wizard.component';
import { CoolWizardStepComponent } from './cool-wizard-step.component';

export const WINDOW_REF = new InjectionToken<Window>('window');

@NgModule({
  imports: [
  ],
  declarations: [
    CoolWizardComponent,
    CoolWizardStepComponent,
  ],
  providers: [
    {
      provide: WINDOW_REF,
      useValue: window
    }
  ],
  exports: [
    CoolWizardComponent,
    CoolWizardStepComponent,
  ]
})
export class CoolWizardModule { }
