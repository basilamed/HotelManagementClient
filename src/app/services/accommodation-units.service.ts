import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getFilteredAccommodationUnits(filters: UnitQueryDto) {
    let params = new HttpParams();
  
    if (filters.price) {
      params = params.append('price', filters.price.toString());
    }

    if (filters.sortBy) {
      params = params.append('SortBy', filters.sortBy);
    }

    if (filters.isSortAscending != null) {
      params = params.append('IsSortAscending', filters.isSortAscending.toString());
    }

    if (filters.floor) {
      params = params.append('Floor', filters.floor.toString());
    }

    if (filters.numberOfPeople) {
      params = params.append('NumberOfPeople', filters.numberOfPeople.toString());
    }

    if (filters.periodOf) {
      params = params.append('PeriodOf', new Date(filters.periodOf).toISOString());
    }
    
    if (filters.periodTo) {
      params = params.append('PeriodTo', new Date(filters.periodTo).toISOString());
    }

    if (filters.page) {
      params = params.append('Page', filters.page.toString());
    }

    if (filters.pageSize) {
      params = params.append('PageSize', filters.pageSize.toString());
    }
  
    return this.http.get(this.url + '/AccommodationUnit/get-all', { params: params });
  }
  

  getAccommodationUnitById(id: number) {
    return this.http.get(this.url + '/AccommodationUnit/get-by-id/' + id);
  }

  addAccommodationUnit(AccommodationUnit : SaveAccommodationUnit){
    return this.http.post(this.url + `/AccommodationUnit/add`, AccommodationUnit);
  }

  updateAccommodationUnit(AccommodationUnit : UpdateAccommodationUnit, id: number){
    return this.http.put(this.url + `/AccommodationUnit/update/${id}`, AccommodationUnit);
  }

  deleteAccommodationUnit( id: number){
    return this.http.delete(this.url + '/AccommodationUnit/delete/' + id);
  }
}

export interface SaveAccommodationUnit {
  capacity: number;
  floor: number;
  image: string;
  name: string;
  type: string;
  characteristicsIds: number[];  // Promenjeno ime polja
  minibarId: number;
  description: string;
}

export interface UpdateAccommodationUnit {
  capacity: number;
  floor: number;
  image: string;
  name: string;
  type: string;
  description: string;
}

export interface UnitQueryDto {
  price?: number;
  sortBy?: string;
  isSortAscending?: boolean;
  floor?: number;
  numberOfPeople?: number;
  periodOf?: string;
  periodTo?: string;
  page: number;
  pageSize: number;
}


