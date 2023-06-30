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
}

export interface SaveReceipt {
  reservationId: number;
  items: number[];
  itemsAmount: number[];
}
