import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CoolLoadingButtonComponent } from './cool-loading-button.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';

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
