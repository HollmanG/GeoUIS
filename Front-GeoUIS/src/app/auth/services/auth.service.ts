import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/auth-interface';
import { catchError, map, of, tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL: string = environment.baseURL;
  private _usuario !: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) { }

  register(nombre:string, correo: string, password: string){

    const url = `${this.baseURL}/usuarios`;

    const rol = 1; // Rol por default
    const body = { nombre, correo, password, rol };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  login(correo: string, password: string) {

    const url = `${this.baseURL}/auth/login`;
    const body = { correo, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )

  }

  validarToken(): Observable<boolean> {
    const url = `${this.baseURL}/auth/renew`;
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token') || '')

    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {

          localStorage.setItem('token', resp.token!);
            this._usuario = {
              correo: resp.correo!,
              id: resp.id!
            }
          return resp.ok;
        }),
        catchError(err => of(false))
      )
  }

  logOut(){
    localStorage.removeItem('token');
  }

}
