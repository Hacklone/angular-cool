import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'cool-apple-button',
  templateUrl: './cool-apple-button.component.html',
  styleUrls: ['./cool-apple-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  standalone: true,
})
export class CoolAppleButtonComponent {
  @Input()
  public disabled: boolean;

  @Input()
  public color: 'dark' | 'light' = 'dark';

  @Output()
  public click: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  public onClick(event: MouseEvent) {
    if (this.disabled) {
      return;
    }

    this.click.emit(event);

    event.stopPropagation();
    event.preventDefault();
  }
}
