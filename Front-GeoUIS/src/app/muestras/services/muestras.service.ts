import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Muestra, MuestraResponse, MuestraResponses, MuestrasResponse } from '../interfaces/muestra.interface';

@Injectable({
  providedIn: 'root'
})
export class MuestrasService {

  private baseUrl: string = environment.baseURL;
  private _muestras !: Muestra[];

  get muestras(){
    return { ...this._muestras};
  }

  constructor(private http: HttpClient) { }

  getMuestras(): Observable<Muestra[]> {
    return this.http.get<MuestrasResponse>(`${this.baseUrl}/muestras`)
    .pipe(
      map(resp => {
            return resp.muestras!
        }
      )
    )
  }

  getMuestraPorId(id: number): Observable<Muestra> {
    return this.http.get<MuestraResponses>(`${this.baseUrl}/muestras/${id}`)
    .pipe(
      map(resp =>{
        return resp.muestra![0]
      })
    )
  }

  agregarMuestra(muestra: Muestra): Observable<Muestra> {
    //Token actual
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token') || '')


    return this.http.post<MuestraResponse>(`${this.baseUrl}/muestras`, muestra, { headers })
    .pipe(
      map(resp =>{
        return resp.muestra!
      })
    )
  }

  actualizarMuestra(muestra: Muestra): Observable<Muestra> {
    //Token actual
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token') || '')

    return this.http.put<MuestraResponse>(`${this.baseUrl}/muestras/${muestra.id_muestra}`, muestra, { headers })
    .pipe(
      map(resp =>{
        return resp.muestra!
      })
    )
  }

  borrarMuestra(id: number): Observable<any> {
    //Token actual
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token') || '')
    return this.http.delete<any>(`${this.baseUrl}/muestras/${id}`, { headers })
  }

  getSugerencias(termino:string) : Observable<any> {
    return this.http.get<Muestra[]>(`${this.baseUrl}/muestras?q=${termino}&limit=6`)
  }

}
