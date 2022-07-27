import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../interfaces/auth-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL:string = environment.baseURL;

  constructor(private http: HttpClient) { }

  login(correo: string, password:string ) {

    const url = `${this.baseURL}/auth/login`;
    const body = {correo, password};

    return this.http.post<AuthResponse>(url, body);

  }

}
