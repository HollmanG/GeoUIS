import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fotos } from '../interfaces/fotos.interface';
import { Muestra } from '../interfaces/muestra.interface';

@Injectable({
  providedIn: 'root'
})
export class MuestrasService {

  private baseUrl: string = environment.apiEndPoint;

  constructor(private http: HttpClient) { }

  getMuestras(): Observable<Muestra[]> {
    return this.http.get<Muestra[]>(`${this.baseUrl}/muestras`)
  }

  getMuestraPorId(id: string): Observable<Muestra> {
    return this.http.get<Muestra>(`${this.baseUrl}/muestras/${id}`)
  }

  agregarMuestra(muestra: Muestra): Observable<Muestra> {
    //Token actual
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token') || '')

    return this.http.post<Muestra>(`${this.baseUrl}/muestras`, muestra, { headers })
  }

  actualizarMuestra(muestra: Muestra): Observable<Muestra> {
    //Token actual
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token') || '')

    return this.http.put<Muestra>(`${this.baseUrl}/muestras/${muestra.id}`, muestra, { headers })
  }

  borrarMuestra(id: string): Observable<any> {
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

  borrarFoto(id_muestra: number, id_foto: number){
    //Token actual
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token') || '')
    
    //Body
    const body = {id_muestra,id_foto}
      return this.http.delete<any>(`${this.baseUrl}/muestras/fotos`, body , {headers} )
  }

}
