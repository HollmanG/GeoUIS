import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fotos, FotosResponse } from '../interfaces/fotos.interface';

@Injectable({
  providedIn: 'root'
})
export class FotosService {

  private baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient) { }
  
  getFotos(id_muestra: number): Observable<Fotos[]> {
    return this.http.get<FotosResponse>(`${this.baseUrl}/muestras/fotos/${id_muestra}`)
    .pipe(
        map(
            resp => {
                return resp.fotos
            }
        )
    )
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

}
