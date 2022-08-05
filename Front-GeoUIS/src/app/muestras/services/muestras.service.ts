import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Muestra } from '../interfaces/muestra.interface';

@Injectable({
  providedIn: 'root'
})
export class MuestrasService {

  private baseUrl: string = environment.apiEndPoint;

  constructor(private http: HttpClient) { }

  getMuestras() : Observable<Muestra[]> {
    return this.http.get<Muestra[]>(`${this.baseUrl}/muestras`)
  }

  getMuestraPorId(id:string) : Observable<Muestra> {
    return this.http.get<Muestra>(`${this.baseUrl}/muestras/${id}`)
  }

  getSugerencias(termino:string) : Observable<Muestra[]> {
    return this.http.get<Muestra[]>(`${this.baseUrl}/muestras?q=${termino}&_limit=6`)
  }

  agregarMuestra(muestra : Muestra): Observable<Muestra>{
    return this.http.post<Muestra>(`${this.baseUrl}/muestras`,muestra)
  }

  actualizarMuestra (muestra: Muestra): Observable<Muestra>{
    return this.http.put<Muestra>(`${this.baseUrl}/muestras/${ muestra.id }`,muestra)
  }

  borrarMuestra (id: string): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/muestras/${ id }`)
  }

}
