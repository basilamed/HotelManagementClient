import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from 'src/app/env';

@Injectable({
  providedIn: 'root'
})
export class CharacteristicService {
  
  private url = env.url;


  constructor(private http: HttpClient) { }

  getCharacteristics() {
    return this.http.get(this.url + '/Characteristics/get-all');
  }
}
