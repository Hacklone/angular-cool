import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[coolInlineEditFieldInput]',
  standalone: false
})
export class CoolInlineEditFieldInputDirective {
  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
  }

  public elementRef: ElementRef;
}
