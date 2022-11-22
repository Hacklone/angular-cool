import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoolDialogComponent } from './cool-dialog/cool-dialog.component';
import { CoolDialogConfig } from './cool-dialog-config.interface';
import { CoolDialogResult } from './cool-dialog-result.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CoolDialogService {
  constructor(private _dialog: MatDialog) {

  }

  public async showDialog(config: CoolDialogConfig): Promise<CoolDialogResult> {
    const dialogRef = this._dialog.open<CoolDialogComponent, CoolDialogConfig, CoolDialogResult>(CoolDialogComponent, {
      disableClose: true,
      data: config,
    });

    const result = await firstValueFrom(dialogRef.afterClosed());

    return result || {
      isConfirmed: false,
    };
  }
}
