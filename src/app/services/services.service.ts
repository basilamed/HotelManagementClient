import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from 'src/app/env';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private url = env.url;

  constructor(private http: HttpClient) { }

  getServices() {
    return this.http.get(this.url + '/Service/get-all');
  }

  addService(service: AddService) {
    return this.http.post(this.url + '/Service/add', service);
  }
}
export interface AddService {
  name: string;
  price: number;
}