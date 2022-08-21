import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Municipio, MunicipioResponse } from '../interfaces/municipios.interface';
import { TipoMuestra,TipoMuestraResponse } from '../interfaces/muestra.interface';
import { Ubicacion, UbicacionResponse } from '../interfaces/ubicaciones.interface';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {

  private baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient) { }

  getMunicipios(): Observable<Municipio[]>{
    return this.http.get<MunicipioResponse>(`${this.baseUrl}/filtros/municipios`)
    .pipe(
      map( resp => {
        return resp.municipios
      })
    )
  }

  getMunicipio(id_municipio: string): Observable<Municipio>{
    return this.http.get<MunicipioResponse>(`${this.baseUrl}/filtros/municipios/${id_municipio}`)
    .pipe(
      map( resp => {
        return resp.municipios[0]
      })
    )
  }

  getTiposMuestras(): Observable<TipoMuestra[]>{
    return this.http.get<TipoMuestraResponse>(`${this.baseUrl}/filtros/tiposMuestra`)
    .pipe(
      map( resp => {
        return resp.tiposMuestra
      })
    )
  }


  getUbicaciones():Observable<Ubicacion[]>{
    return this.http.get<UbicacionResponse>(`${this.baseUrl}/filtros/ubicaciones`)
    .pipe(
      map( resp => {
        return resp.ubicaciones
      })
    )
  }



}
