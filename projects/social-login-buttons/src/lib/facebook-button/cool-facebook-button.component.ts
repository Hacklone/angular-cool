import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'cool-facebook-button',
  templateUrl: './cool-facebook-button.component.html',
  styleUrls: ['./cool-facebook-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  standalone: true,
})
export class CoolFacebookButtonComponent {
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
