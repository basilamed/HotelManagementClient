import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from 'src/app/env';

@Injectable({
  providedIn: 'root'
})
export class MinibarService {
  private url = env.url;


  constructor(private http: HttpClient) { }

  getMinibars() {
    return this.http.get(this.url + '/Minibar/get-all');
  }

}
