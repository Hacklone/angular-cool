import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { debounceTime } from 'rxjs/operators';
import { CoolInlineEditFieldInputDirective } from './cool-inline-edit-field-input.directive';

@Component({
  selector: 'cool-inline-edit-field',
  templateUrl: './cool-inline-edit-field.component.html',
  styleUrls: ['./cool-inline-edit-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CoolInlineEditFieldComponent),
      multi: true
    }
  ]
})
export class CoolInlineEditFieldComponent implements AfterContentInit, ControlValueAccessor, OnDestroy {
  private _onChangeDelegate: (value: string) => void;
  private _onTouchedDelegate: (value: string) => void;
  private _stopEditSubscription: Subscription;
  private _stopEditSubject: Subject<void> = new Subject<void>();

  constructor(private _changeDetector: ChangeDetectorRef,
              private _elementRef: ElementRef) {

  }

  public originalValue: string;
  public innerValue: string;
  public isEditing = false;
  public isDisabled = false;

  @ContentChild(CoolInlineEditFieldInputDirective)
  public fieldInput: CoolInlineEditFieldInputDirective;

  @Input()
  public hideIndicator: boolean;

  @Input()
  public placeholder: string;

  @Input()
  public emptyText: string;

  @Input()
  public fontSize: string;

  @Input()
  public type: string;

  @Output()
  public saved: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public editStarted: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public editStopped: EventEmitter<string> = new EventEmitter<string>();

  public width: number;
  public height: number;

  public ngAfterContentInit() {
    this._stopEditSubscription = this._stopEditSubject
      .pipe(debounceTime(200))
      .subscribe(() => {
        this.stopEditing();
      });
  }

  public ngOnDestroy() {
    if (this._stopEditSubscription) {
      this._stopEditSubscription.unsubscribe();
    }
  }

  public startEdit() {
    if (this.isDisabled) {
      return;
    }

    this._updateSize();

    this.editStarted.emit();

    this.isEditing = true;

    this.originalValue = this.innerValue;

    this._changeDetector.detectChanges();

    this.focus();
  }

  public stopEditing() {
    this.isEditing = false;

    this._changeDetector.detectChanges();

    if (this.innerValue !== this.originalValue) {
      this._onChangeDelegate(this.innerValue);
      this._onTouchedDelegate(this.innerValue);

      this.saved.emit(this.innerValue);
    }

    this.editStopped.emit();
  }

  public onFieldKeyUp(keyCode: number) {
    if (keyCode === 13) {
      this.saveEditing();
    } else if (keyCode === 27) {
      this.cancelEditing();
    }
  }

  public saveEditing() {
    this._stopEditSubject.next();
  }

  public cancelEditing() {
    this._resetToOriginal();

    this.saveEditing();
  }

  public focus() {
    const inputElement = this._getInputField();

    if (inputElement) {
      inputElement.focus();
    }
  }

  public onInputFocusout() {
    this._stopEditSubject.next();
  }

  public writeValue(obj: any): void {
    this.innerValue = obj;
  }

  public registerOnChange(fn: any): void {
    this._onChangeDelegate = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouchedDelegate = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  private _updateSize() {
    this.width = this._elementRef.nativeElement.offsetWidth;
    this.height = this._elementRef.nativeElement.offsetHeight;
  }

  private _resetToOriginal() {
    this.innerValue = this.originalValue;
  }

  private _getInputField() {
    return this._elementRef.nativeElement.querySelector('[coolInlineEditFieldInput]');
  }
}
