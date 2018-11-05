import { NgModule } from '@angular/core';
import { CoolLoadingIndicatorComponent } from './cool-loading-indicator.component';
import { CoolHttpModule } from '@angular-cool/http';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    CoolHttpModule,
  ],
  declarations: [CoolLoadingIndicatorComponent],
  exports: [CoolLoadingIndicatorComponent]
})
export class CoolLoadingIndicatorModule {
}
