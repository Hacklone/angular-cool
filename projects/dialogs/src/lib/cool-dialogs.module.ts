import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CoolDialogComponent } from './cool-dialog/cool-dialog.component';
import { CoolDialogService } from './cool-dialog.service';

import { MatLegacyButtonModule as MatButtonModule, } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
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
