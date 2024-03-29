import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoolDialogResult } from '../cool-dialog-result.interface';
import { CoolDialogConfig } from '../cool-dialog-config.interface';

@Component({
  selector: 'cool-dialog',
  templateUrl: './cool-dialog.component.html',
  styleUrls: ['./cool-dialog.component.scss']
})
export class CoolDialogComponent implements OnInit {
  constructor(private _dialogRef: MatDialogRef<CoolDialogComponent, CoolDialogResult>,
              @Inject(MAT_DIALOG_DATA) private _dialogConfig: CoolDialogConfig) {
  }

  public titleText: string;

  public questionText: string;

  public confirmActionButtonText: string;

  public cancelActionButtonText: string;

  public confirmActionButtonColor: 'primary' | 'accent' | 'warn';

  public showCancelActionButton: boolean;

  public textConfirmation: string | undefined;
  public confirmInput: string;

  public checkBoxConfirmation: string | undefined;
  public checkboxChecked = false;

  ngOnInit() {
    this.titleText = this._dialogConfig.titleText;
    this.questionText = this._dialogConfig.questionText;
    this.confirmActionButtonText = this._dialogConfig.confirmActionButtonText || 'Ok';
    this.cancelActionButtonText = this._dialogConfig.cancelActionButtonText || 'Cancel';
    this.confirmActionButtonColor = this._dialogConfig.confirmActionButtonColor || 'primary';
    this.showCancelActionButton = this._dialogConfig.showCancelActionButton || true;
    this.textConfirmation = this._dialogConfig.textConfirmation;
    this.checkBoxConfirmation = this._dialogConfig.checkBoxConfirmation;
  }

  public onCancelClick() {
    this._dialogRef.close({
      isConfirmed: false
    });
  }

  public onConfirmClick() {
    this._dialogRef.close({
      isConfirmed: true
    });
  }
}
