import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, output, signal, } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'cool-loading-button',
  templateUrl: './cool-loading-button.component.html',
  styleUrls: ['./cool-loading-button.component.scss'],
  imports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    NgTemplateOutlet,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CoolLoadingButton<T> {

  constructor(
    private _changeDetector: ChangeDetectorRef,
  ) {
  }

  public isLoading = signal<boolean>(false);

  @Input()
  public color: ThemePalette;

  @Input()
  public spinnerColor: ThemePalette;

  @Input()
  public disabled: boolean;

  @Input()
  public display: 'basic' | 'raised' | 'flat' | 'stroked' = 'raised';

  @Input()
  public clickHandler: (parameters: T) => Promise<any> | any;

  @Input()
  public clickParameters: T;

  @Input('class')
  public innerClass: string = '';

  public loadingChanged = output<boolean>();

  public loadingFinished = output<void>();

  public async onClick() {
    if (this.disabled || this.isLoading() || !this.clickHandler) {
      return;
    }

    try {
      this._changeIsLoading(true);

      await Promise.resolve(this.clickHandler(this.clickParameters));
    } finally {
      this._changeIsLoading(false);

      this.loadingFinished.emit();
    }
  }

  private _changeIsLoading(loadingValue: boolean) {
    this.isLoading.set(loadingValue);

    this.loadingChanged.emit(loadingValue);

    this._changeDetector.markForCheck();
  }
}
