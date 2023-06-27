import { Injectable } from '@angular/core';
import { env } from '../env';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  url = env.url;
  constructor(private http: HttpClient) { }

  getDateRange(id: number){
    return this.http.get(`${this.url}/Reservation/dates/${id}`);
  }
}
