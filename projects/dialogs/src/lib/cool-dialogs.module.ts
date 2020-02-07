import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoolDialogComponent } from './cool-dialog/cool-dialog.component';
import { CoolDialogService } from './cool-dialog.service';

import { MatButtonModule, } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
export class CoolDialogsModule {
}
