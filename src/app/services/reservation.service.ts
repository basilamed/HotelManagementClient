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

  requestReservation(dto: AddReservation){
    return this.http.post(`${this.url}/Reservation/request-reservation`, dto);
  }

  acceptReservation(id: number){
    return this.http.get(`${this.url}/Reservation/accept/${id}`);
  }

  deleteReservation(id: number){
    return this.http.delete(`${this.url}/Reservation/delete/${id}`);
  }

  getApprovedReservations(){
    return this.http.get(`${this.url}/Reservation/approved`);
  }

  getUnapprovedReservations(){
    return this.http.get(`${this.url}/Reservation/not-approved`);
  }

  
}
export interface AddReservation {
  checkIn: Date;
  checkOut: Date;
  numberOfPeople: number;
  accommodationUnitId: number;
  userId: string;
  serviceIds: number[];
}
