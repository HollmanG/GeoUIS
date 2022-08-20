import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Municipio, MunicipioResponse } from '../interfaces/municipios.interface';

@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {

  private baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient) { }

  getMunicipios(): Observable<Municipio[]>{
    return this.http.get<MunicipioResponse>(`${this.baseUrl}/municipios`)
    .pipe(
      map( resp => {
        return resp.municipios
      })
    )
  }

  getMunicipio(id_municipio: string): Observable<Municipio>{
    return this.http.get<MunicipioResponse>(`${this.baseUrl}/municipios/${id_municipio}`)
    .pipe(
      map( resp => {
        return resp.municipios[0]
      })
    )
  }
}
