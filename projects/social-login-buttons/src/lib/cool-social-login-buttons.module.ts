import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CoolGoogleButtonComponent } from './google-button/cool-google-button.component';
import { CoolFacebookButtonComponent } from './facebook-button/cool-facebook-button.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [],
  declarations: [
    CoolGoogleButtonComponent,
    CoolFacebookButtonComponent,
  ],
  exports: [
    CoolGoogleButtonComponent,
    CoolFacebookButtonComponent,
  ],
})
export class CoolSocialLoginButtonsModule {
}
