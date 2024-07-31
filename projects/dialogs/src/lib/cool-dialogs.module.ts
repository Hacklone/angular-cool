import { ModuleWithProviders, NgModule } from '@angular/core';
import { CoolDialogService } from './cool-dialog.service';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    MatDialogModule,
  ],
  providers: [
    CoolDialogService,
  ],
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
