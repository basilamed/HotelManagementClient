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

  addAccommodationUnit(AccommodationUnit : SaveAccommodationUnit, id: number){
    return this.http.post(this.url + `/AccommodationUnit/add`, AccommodationUnit);
  }

  updateAccommodationUnit(AccommodationUnit : SaveAccommodationUnit, id: number){
    return this.http.put(this.url + `/AccommodationUnit/update/${id}`, AccommodationUnit);
  }

  deleteAccommodationUnit( id: number){
    return this.http.delete(this.url + '/AccommodationUnit/delete/' + id);
  }
}

export interface SaveAccommodationUnit{
  capacity: number;
  floor: number;
  image: string;
  name: string;
  type: string;
  characteristicsId: number;
  minibarId: number;
}

