import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Muestra } from '../interfaces/muestra.interface';

@Injectable({
  providedIn: 'root'
})
export class MuestrasService {

  constructor(private http: HttpClient) { }

  getMuestras() : Observable<Muestra[]> {
    return this.http.get<Muestra[]>('http://localhost:3000/muestras')
  }

}
