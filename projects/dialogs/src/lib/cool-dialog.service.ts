import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { CoolDialogComponent } from './cool-dialog/cool-dialog.component';
import { CoolDialogConfig } from './cool-dialog-config.interface';
import { CoolDialogResult } from './cool-dialog-result.interface';

@Injectable()
export class CoolDialogService {
  constructor(private _dialog: MatDialog) {

  }

  public async showDialog(config: CoolDialogConfig): Promise<CoolDialogResult> {
    const dialogRef = this._dialog.open<CoolDialogComponent, CoolDialogConfig, CoolDialogResult>(CoolDialogComponent, {
      disableClose: true,
      data: config,
    });

    const result = await dialogRef.afterClosed().toPromise();

    return result || {
      isConfirmed: false,
    };
  }
}
