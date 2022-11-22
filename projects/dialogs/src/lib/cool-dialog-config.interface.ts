export interface CoolDialogConfig {
  titleText: string;

  questionText: string;

  confirmActionButtonText?: string;

  cancelActionButtonText?: string;

  confirmActionButtonColor?: 'primary' | 'accent' | 'warn';

  showCancelActionButton?: boolean;

  textConfirmation?: string;
}
