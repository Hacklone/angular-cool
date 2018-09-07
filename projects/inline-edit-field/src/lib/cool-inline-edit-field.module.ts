import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Angular2FontawesomeModule } from 'angular2-fontawesome';

import { CoolInlineEditFieldComponent } from './cool-inline-edit-field.component';
import { CoolInlineEditFieldInputDirective } from './cool-inline-edit-field-input.directive';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
