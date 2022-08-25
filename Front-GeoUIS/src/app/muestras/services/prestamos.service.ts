import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Prestamo, PrestamoDisponibleResponse, PrestamoResponse } from '../interfaces/prestamos.interface';


@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  private baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient) { }

  agregarPrestamo(prestamo: Prestamo): Observable<Prestamo> {
    //Token actual
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token') || '')

    const añadirprestamobody = {
      id_muestra : prestamo.id_muestra,
      fecha_prestamo : prestamo.fecha_prestamo
    }

    return this.http.post<PrestamoResponse>(`${this.baseUrl}/prestamos`, añadirprestamobody, { headers })
    .pipe(
      map(resp =>{
        return resp.prestamo
      })
    )
  }

  getDisponible(id_muestra: number): Observable<Boolean>{
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token') || '')

    return this.http.get<PrestamoDisponibleResponse>(`${this.baseUrl}/prestamos/${id_muestra}`, { headers })
    .pipe(
      map(resp =>{
        return resp.disponible
      })
    )
  }
}
