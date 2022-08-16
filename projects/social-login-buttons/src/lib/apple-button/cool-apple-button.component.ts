import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'cool-apple-button',
  templateUrl: './cool-apple-button.component.html',
  styleUrls: ['./cool-apple-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CoolAppleButtonComponent implements OnInit {

  constructor() {
  }

  @Input()
  public disabled: boolean;

  @Input()
  public color: 'dark' | 'light' = 'dark';

  @Output()
  public click: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  ngOnInit() {
  }

  public onClick(event: MouseEvent) {
    if (this.disabled) {
      return;
    }

    this.click.emit(event);

    event.stopPropagation();
    event.preventDefault();
  }
}
