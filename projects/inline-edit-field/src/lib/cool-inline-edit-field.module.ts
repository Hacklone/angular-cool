import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Angular2FontawesomeModule } from 'angular2-fontawesome';

import { CoolInlineEditFieldComponent } from './cool-inline-edit-field.component';
import { CoolInlineEditFieldInputDirective } from './cool-inline-edit-field-input.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    Angular2FontawesomeModule,
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
