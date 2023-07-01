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
    return this.http.post(`${this.url}/Reservation/accept/${id}`, null);
  }

  deleteReservation(id: number){
    return this.http.delete(`${this.url}/Reservation/delete/${id}`);
  }

  getApprovedReservations(){
    return this.http.get(`${this.url}/Reservation/without-receipts`);
  }

  getUnapprovedReservations(){
    return this.http.get(`${this.url}/Reservation/not-approved`);
  }

  getReservationById(id: number){
    return this.http.get(`${this.url}/Reservation/get-by-id/${id}`);
  }

  getReservationsByUserId(id: string){
    return this.http.get(`${this.url}/Reservation/user-reservations/${id}`);
  }

  getReservationsWithoutReceit(){
    return this.http.get<any[]>(`${this.url}/Reservation/not-approved-without`);
  }

  addService(dto: ReservationServiceRS){
    return this.http.post(`${this.url}/Reservation/add-service`, dto);
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

export interface ReservationServiceRS {
  reservationId: number;
  serviceId: number;
  uses: number;
}
