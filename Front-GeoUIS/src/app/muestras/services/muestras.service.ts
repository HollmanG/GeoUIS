import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fotos } from '../interfaces/fotos.interface';
import { Muestra, MuestraResponse, MuestrasResponse } from '../interfaces/muestra.interface';

@Injectable({
  providedIn: 'root'
})
export class MuestrasService {

  private baseUrl: string = environment.baseURL;
  private _muestra !: Muestra;
  private _muestras !: Muestra[];

  get muestras(){
    return { ...this._muestras};
  }

  get muestra() {
    return { ...this._muestra };
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
    return this.http.get<MuestraResponse>(`${this.baseUrl}/muestras/${id}`)
    .pipe(
      map(resp =>{
        return resp.muestra!
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

    return this.http.put<Muestra>(`${this.baseUrl}/muestras/${muestra.id_muestra}`, muestra, { headers })
  }

  borrarMuestra(id: number): Observable<any> {
    //Token actual
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token') || '')
    return this.http.delete<any>(`${this.baseUrl}/muestras/${id}`, { headers })
  }

  getFotos(id_muestra: number): Observable<Fotos[]> {
    return this.http.get<Fotos[]>(`${this.baseUrl}/muestras/fotos/${id_muestra}`)
  }

  agregarFoto(foto : Fotos): Observable<Fotos>{
    //Token actual
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token') || '')
    return this.http.post<Fotos>(`${this.baseUrl}/muestras/fotos`,foto,{headers})
  }

  borrarFoto(id_muestra: number){
    //Token actual
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token') || '')
    
      return this.http.delete<any>(`${this.baseUrl}/muestras/fotos/${id_muestra}` , {headers} )
  }

  getSugerencias(termino:string) : Observable<Muestra[]> {
    return this.http.get<Muestra[]>(`${this.baseUrl}/muestras?q=${termino}&_limit=6`)
  }

}
