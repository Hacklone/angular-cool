import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'cool-loading-button',
  templateUrl: './cool-loading-button.component.html',
  styleUrls: ['./cool-loading-button.component.scss'],
})
export class CoolLoadingButtonComponent<T> {

  constructor() {
  }

  public isLoading: boolean;

  @Input()
  public color: ThemePalette;

  @Input()
  public spinnerColor: ThemePalette;

  @Input()
  public disabled: boolean;

  @Input()
  public clickHandler: (parameters: T) => Promise<any> | any;

  @Input()
  public clickParameters: T;

  @Output()
  public loadingChanged = new EventEmitter<boolean>();

  @Output()
  public loadingFinished = new EventEmitter<void>();

  public async onClick() {
    if (this.disabled || this.isLoading || !this.clickHandler) {
      return;
    }

    try {
      this._changeIsLoading(true);

      await Promise.resolve(this.clickHandler(this.clickParameters));
    } finally {
      this._changeIsLoading(false);

      this.loadingFinished.next();
    }
  }

  private _changeIsLoading(loadingValue: boolean) {
    this.isLoading = loadingValue;

    this.loadingChanged.next(this.isLoading);
  }
}
