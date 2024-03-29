
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Prestamo, PrestamoDisponibleResponse, PrestamoResponse, PrestamosResponse, PrestamosUsuarioResponse } from '../interfaces/prestamos.interface';
import { getPrestamos } from '../../../../../Back-GeoUIS/controllers/prestamo.ctrl';


@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  private baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient) { }
  // service add loan
  agregarPrestamo(prestamo: Prestamo): Observable<Prestamo> {
    //Token actual
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token') || '')

    const añadirprestamobody = {
      id_muestra: prestamo.id_muestra,
      fecha_prestamo: prestamo.fecha_prestamo
    }

    return this.http.post<PrestamoResponse>(`${this.baseUrl}/prestamos`, añadirprestamobody, { headers })
      .pipe(
        map(resp => {
          return resp.prestamo
        })
      )
  }
  // service get loan availability
  getDisponible(id_muestra: number): Observable<boolean> {
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token') || '')

    return this.http.get<PrestamoDisponibleResponse>(`${this.baseUrl}/prestamos/${id_muestra}`, { headers })
      .pipe(
        map(resp => {
          return resp.disponible
        })
      )
  }

  // service return loan
  DevolverPrestamo(id_muestra: number, fechaActual: string): Observable<Prestamo> {
    //Token actual
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token') || '')

    const devolverPrestamo = {
      fecha_devolucion: fechaActual
    }

    return this.http.put<PrestamoResponse>(`${this.baseUrl}/prestamos/${id_muestra}`, devolverPrestamo, { headers })
      .pipe(
        map(resp => {
          return resp.prestamo
        })
      )
  }

  // service get loans
  getPrestamos(): Observable<Prestamo[]> {
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token') || '')

    return this.http.get<PrestamosResponse>(`${this.baseUrl}/prestamos`, { headers })
      .pipe(
        map(resp => {
          return resp.prestamos
        })
      )
  }
  // service get loan
  getPrestamo(id_usuario: number): Observable<Prestamo[]> {
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token') || '')

    return this.http.get<PrestamosUsuarioResponse>(`${this.baseUrl}/prestamos/usuario/${id_usuario}`)
      .pipe(
        map(resp => {
          return resp.prestamo
        })
      )
  }

}
