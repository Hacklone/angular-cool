export interface CoolDialogConfig {
  titleText: string;

  questionText: string;

  confirmActionButtonText?: string;

  confirmActionButtonClassNames?: string[];

  cancelActionButtonText?: string;

  confirmActionButtonColor?: CoolDialogButtonColors;

  showCancelActionButton?: boolean;

  textConfirmation?: string;

  textConfirmationPrefixText?: string;

  textConfirmationPostfixText?: string;

  checkBoxConfirmation?: string;
}

export type CoolDialogButtonColors = 'primary' | 'accent' | 'tertiary' | 'warn';
