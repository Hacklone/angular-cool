import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoolDialogComponent } from './cool-dialog/cool-dialog.component';
import { CoolDialogService } from './cool-dialog.service';

import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    CoolDialogService
  ],
  declarations: [
    CoolDialogComponent,
  ],
  exports: [
    CoolDialogComponent,
  ],
  entryComponents: [
    CoolDialogComponent,
  ]
})
export class CoolDialogsModule { }
