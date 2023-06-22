import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from 'src/app/env';

@Injectable({
  providedIn: 'root'
})
export class AccommodationUnitsService {
 
  private url = env.url;


  constructor(private http: HttpClient) { }

  getAccommodationUnits() {
    return this.http.get(this.url + '/AccommodationUnit/get-all');
  }

  getAccommodationUnitById(id: number) {
    return this.http.get(this.url + '/AccommodationUnit/get-by-id/' + id);
  }
}
