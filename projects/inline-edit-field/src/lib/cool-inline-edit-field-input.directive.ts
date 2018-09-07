import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[coolInlineEditFieldInput]'
})
export class CoolInlineEditFieldInputDirective {
  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
  }

  public elementRef: ElementRef;
}
