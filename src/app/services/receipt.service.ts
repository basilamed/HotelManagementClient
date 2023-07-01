import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../env';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  url = env.url;
  constructor(private http: HttpClient) { }

  createReceipt(save: SaveReceipt){
    return this.http.post(`${this.url}/Receipt/create-receipt`, save);
  }

  addResItems(dto: SaveResItem){
    return this.http.post(`${this.url}/Receipt/add-items-reservations`, dto);
  }

  addServices(dto: SaveResItem){
    return this.http.post(`${this.url}/Receipt/add-service`, dto);
  }

  getReceiptByResId(id: number){
    return this.http.get(`${this.url}/Receipt/get-by-resId/${id}`);
  }
}

export interface SaveReceipt {
  reservationId: number;
}

export interface SaveResItem {
  itemId: number;
  reservationId: number;
  amount: number;
}

