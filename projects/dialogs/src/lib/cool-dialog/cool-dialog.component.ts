import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CoolDialogResult } from '../cool-dialog-result.interface';
import { CoolDialogButtonColors, CoolDialogConfig } from '../cool-dialog-config.interface';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CdkTrapFocus } from '@angular/cdk/a11y';

@Component({
  selector: 'cool-dialog',
  templateUrl: './cool-dialog.component.html',
  styleUrls: ['./cool-dialog.component.scss'],
  standalone: true,
  imports: [
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    CdkTrapFocus,
  ],
})
export class CoolDialogComponent implements OnInit {
  constructor(
    private _dialogRef: MatDialogRef<CoolDialogComponent, CoolDialogResult>,
    @Inject(MAT_DIALOG_DATA) private _dialogConfig: CoolDialogConfig,
  ) {
  }

  public titleText: string;

  public questionText: string;

  public confirmActionButtonText: string;

  public confirmActionButtonClassNames: string[];

  public cancelActionButtonText: string;

  public confirmActionButtonColor: CoolDialogButtonColors;

  public showCancelActionButton: boolean;

  public textConfirmation: string | undefined;

  public textConfirmationPlaceholder: string;
  public textConfirmationPrefixText: string;
  public textConfirmationPostfixText: string;

  public confirmInput: string;

  public checkBoxConfirmation: string | undefined;
  public checkboxChecked = false;

  ngOnInit() {
    this.titleText = this._dialogConfig.titleText;
    this.questionText = this._dialogConfig.questionText;
    this.confirmActionButtonText = this._dialogConfig.confirmActionButtonText || 'Ok';
    this.confirmActionButtonClassNames = this._dialogConfig.confirmActionButtonClassNames ?? [];
    this.cancelActionButtonText = this._dialogConfig.cancelActionButtonText || 'Cancel';
    this.confirmActionButtonColor = this._dialogConfig.confirmActionButtonColor || 'primary';
    this.showCancelActionButton = this._dialogConfig.showCancelActionButton ?? true;
    this.textConfirmation = this._dialogConfig.textConfirmation;
    this.checkBoxConfirmation = this._dialogConfig.checkBoxConfirmation;
    this.textConfirmationPrefixText = this._dialogConfig.textConfirmationPrefixText || 'To confirm please type ';
    this.textConfirmationPostfixText = this._dialogConfig.textConfirmationPostfixText || ' into the input below to enable confirm button.';
    this.textConfirmationPlaceholder = (this._dialogConfig.textConfirmationPlaceholder || `Write '$1' to enable confirm button`).replace('$1', this.textConfirmation || '');
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
