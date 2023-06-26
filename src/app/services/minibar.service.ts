import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from 'src/app/env';

@Injectable({
  providedIn: 'root'
})
export class MinibarService {

  private url = env.url;

  constructor(private http: HttpClient) { }

  getMinibars() {
    return this.http.get(this.url + '/Minibar/get-all');
  }

  getMinibarById(id: Number) {
    return this.http.get(this.url + '/Minibar/get-by-id/' + id);
  }

  deleteItem(minibarId: Number, id: Number) {
    return this.http.delete(this.url + '/Minibar/delete-items/' + minibarId + '/' + id);
  }

  deleteMinibar(id: Number) {
    return this.http.delete(this.url + '/Minibar/delete/' + id);
  }

  addItem(item :SaveMinibarItem) {
    return this.http.post(this.url + '/Minibar/add-items' , item);
  }

}
export interface SaveMinibarItem {
  minibarId: number;
  itemId: number;
  amount: number;
}
