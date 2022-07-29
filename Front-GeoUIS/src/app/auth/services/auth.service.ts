import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/auth-interface';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL:string = environment.baseURL;
  private _usuario !: Usuario;

  get usuario() {
    return {...this._usuario};
  }

  constructor(private http: HttpClient) { }

  login(correo: string, password:string ) {

    const url = `${this.baseURL}/auth/login`;
    const body = {correo, password};

    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap( resp => {
        if( resp.ok ){
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            correo: resp.correo!,
            id: resp.id!
          }
        }
      } ),
      map( resp => resp.ok ),
      catchError( err => of(err.error.msg))
    )

  }

}
