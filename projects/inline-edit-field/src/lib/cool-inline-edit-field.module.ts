import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CoolInlineEditFieldComponent } from './cool-inline-edit-field.component';
import { CoolInlineEditFieldInputDirective } from './cool-inline-edit-field-input.directive';
import { CommonModule } from '@angular/common';
import './icon-library';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    FontAwesomeModule,
  ],
  providers: [

  ],
  declarations: [
    CoolInlineEditFieldComponent,
    CoolInlineEditFieldInputDirective,
  ],
  exports: [
    CoolInlineEditFieldComponent,
    CoolInlineEditFieldInputDirective,
  ],
})
export class CoolInlineEditFieldModule { }
