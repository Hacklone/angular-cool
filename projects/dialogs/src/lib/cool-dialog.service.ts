import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CoolDialogComponent } from './cool-dialog/cool-dialog.component';
import { CoolDialogConfig } from './cool-dialog-config.interface';
import { CoolDialogResult } from './cool-dialog-result.interface';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class CoolDialogService {
  constructor(private _dialog: MatDialog) {

  }

  public showDialog(config: CoolDialogConfig): Promise<CoolDialogResult> {
    return new Promise((resolve) => {
      const dialogRef = this._dialog.open(CoolDialogComponent, {
        disableClose: true,
        data: config,
      });

      dialogRef.beforeClose()
        .pipe(takeUntil(dialogRef.afterClosed()))
        .subscribe(async (result: CoolDialogResult) => {
          resolve(result);
        });
    });
  }
}
