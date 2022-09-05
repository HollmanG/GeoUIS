import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponse, AuthResponseValidar, Usuario } from '../interfaces/auth-interface';
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


  // Register Service
  register(nombre: string, correo: string, password: string) {

    const url = `${this.baseURL}/usuarios`;

    const rol = 1; // Rol por default
    const body = { nombre, correo, password, rol };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
            this._usuario = {
              correo: resp.correo!,
              id: resp.id!,
              nombre: resp.nombre!,
              rol: resp.rol!
            }
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg.errors[0].msg))
      )
  }

  // Login Service
  login(correo: string, password: string) {

    const url = `${this.baseURL}/auth/login`;
    const body = { correo, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
            this._usuario = {
              correo: resp.correo!,
              id: resp.id!,
              nombre: resp.nombre!,
              rol: resp.rol!
            }
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )

  }

  // service that validates user "admin"
  validarTokenAdmin(): Observable<boolean> {
    const url = `${this.baseURL}/auth/renew`;
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token') || '')

    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {

          localStorage.setItem('token', resp.token!);
          this._usuario = {
            correo: resp.correo!,
            id: resp.id!,
            nombre: resp.nombre!,
            rol: resp.rol!
          }
          if (resp.ok = true) {
            if (this._usuario.rol == 2 || this._usuario.rol == 4) {
              return true;
            }
          }
          return false;
        }),
        catchError(err => of(false))
      )
  }

  //service that validates user

  validarTokenUsuario(): Observable<boolean> {
    const url = `${this.baseURL}/auth/renew`;
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token') || '')

    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {

          localStorage.setItem('token', resp.token!);
          this._usuario = {
            correo: resp.correo!,
            id: resp.id!,
            nombre: resp.nombre!,
            rol: resp.rol!
          }
          if (resp.ok = true) {
            if (this._usuario.rol != undefined) {
              return true;
            }
          }
          return false;
        }),
        catchError(err => of(false))
      )
  }

  // LogOut Method
  logOut() {
    localStorage.removeItem('token');

  }

  // service that validates active user
  validarToken(): Observable<boolean> {
    const url = `${this.baseURL}/auth/verify`;
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token') || '')

    return this.http.get<AuthResponseValidar>(url, { headers })
      .pipe(
        map(resp => {
          return resp.ok
        })
      )
  }

}
