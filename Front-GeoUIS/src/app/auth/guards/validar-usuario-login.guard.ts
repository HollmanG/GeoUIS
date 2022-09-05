import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarUsuarioLoginGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  //Validate user login
  canActivate(): Observable<boolean> | boolean {
    if(localStorage.getItem('token') == undefined){
        return true;
    }else{
        this.router.navigateByUrl('/inicio');
        return false;
    }
  }

  canLoad(): Observable<boolean> | boolean {
    if(localStorage.getItem('token') == undefined){
        return true;
    }else{
        this.router.navigateByUrl('/inicio');
        return false;
    }
  }
}
