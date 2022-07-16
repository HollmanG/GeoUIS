import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MuestrasService {

  constructor(private http: HttpClient) { }

  getMuestras() {
    return this.http.get('http://localhost:3000/muestras')
  }

}
