import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CoolDialogComponent } from './cool-dialog/cool-dialog.component';
import { CoolDialogService } from './cool-dialog.service';

import { MatButtonModule, } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    declarations: [
        CoolDialogComponent,
    ],
    exports: [
        CoolDialogComponent,
    ]
})
export class CoolDialogsModule {
  public static forRoot(): ModuleWithProviders<CoolDialogsModule> {
    return {
      ngModule: CoolDialogsModule,
      providers: [
        CoolDialogService,
      ],
    };
  }
}
