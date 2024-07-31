export interface CoolDialogConfig {
  titleText: string;

  questionText: string;

  confirmActionButtonText?: string;

  cancelActionButtonText?: string;

  confirmActionButtonColor?: CoolDialogButtonColors;

  showCancelActionButton?: boolean;

  textConfirmation?: string;

  checkBoxConfirmation?: string;
}

export type CoolDialogButtonColors = 'primary' | 'accent' | 'tertiary' | 'warn';
