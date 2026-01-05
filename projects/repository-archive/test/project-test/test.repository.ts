import { Observable } from 'rxjs';
import { Repository, RepositoryField } from '../../src/public-api';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export interface Item {
}

@Repository()
export class ItemRepository {
  private _http = inject(HttpClient);

  @RepositoryField()
  public getItem(id: string): Observable<Item> {
    return this._http.get(`https://items.com/${id}`);
  }
}
