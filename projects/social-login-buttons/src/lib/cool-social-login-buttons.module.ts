import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CoolGoogleButtonComponent } from './google-button/cool-google-button.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [],
  declarations: [
    CoolGoogleButtonComponent,
  ],
  exports: [
    CoolGoogleButtonComponent,
  ],
})
export class CoolSocialLoginButtonsModule {
}
