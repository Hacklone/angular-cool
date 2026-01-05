import { Component, inject, signal } from '@angular/core';
import { ItemRepository } from './test.repository';
import { fromRepository } from '../../src/public-api';

@Component({
  selector: 'my-component',
  template: ''
})
export class MyComponent {
  private _itemRepository = inject(ItemRepository);

  private _itemId = signal('1');

  protected item = fromRepository(() => this._itemRepository.getItem(this._itemId()));
}
