import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CoolGoogleButtonComponent } from './google-button/cool-google-button.component';
import { CoolFacebookButtonComponent } from './facebook-button/cool-facebook-button.component';
import { CoolAppleButtonComponent } from './apple-button/cool-apple-button.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [],
  declarations: [
    CoolGoogleButtonComponent,
    CoolFacebookButtonComponent,
    CoolAppleButtonComponent,
  ],
  exports: [
    CoolGoogleButtonComponent,
    CoolFacebookButtonComponent,
    CoolAppleButtonComponent,
  ],
})
export class CoolSocialLoginButtonsModule {
}
