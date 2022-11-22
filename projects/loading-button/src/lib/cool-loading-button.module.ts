import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CoolLoadingButtonComponent } from './cool-loading-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  declarations: [
    CoolLoadingButtonComponent,
  ],
  exports: [
    CoolLoadingButtonComponent,
  ],
})
export class CoolLoadingButtonModule {
}
