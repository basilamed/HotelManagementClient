import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { env } from 'src/app/env';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  private url = env.url; 


  constructor(private http: HttpClient) { }

  addPrice(Price : SavePrice){
    return this.http.post(this.url + `/Price/add-price`, Price);
  }

  getPriceForUnit(id: number, checkIn: string){
    return this.http.get(this.url + `/Price/get-price/${id}?checkIn=${checkIn}`);
  }
}
export interface SavePrice {
  pricePerPerson: number;
  pricePerNight: number;
  periodOf: Date;
  periodTo: Date;
  accommodationUnitId: number;
}