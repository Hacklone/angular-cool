import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cool-cool-facebook-button',
  templateUrl: './cool-facebook-button.component.html',
  styleUrls: ['./cool-facebook-button.component.css']
})
export class CoolFacebookButtonComponent implements OnInit {

  constructor() { }

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
