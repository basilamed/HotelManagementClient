import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from 'src/app/env';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private url = env.url; 

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get(this.url + '/Item/get-all');
  }
  
  addItem(Item : SaveItem){
    return this.http.post(this.url + `/Item/add`, Item);
  }

  addToMinibar(ItemMinibar : ItemMinibar){
    return this.http.post(this.url + `/Minibar/add-items`, ItemMinibar);
  }

  getReservationItems(id: number){
    return this.http.get(this.url + `/Reservation/get-items-reservation/${id}`);
  }

}
export interface SaveItem {
  name: string;
  code: string;
  price: number;
}

export interface ItemMinibar {
  itemId: number;
  minibarId: number;
  amount: number;
}


