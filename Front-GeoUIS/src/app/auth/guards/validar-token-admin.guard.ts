import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenAdminGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  //Validate User Admin
  canActivate(): Observable<boolean> | boolean {
    return this.authService.validarTokenAdmin()
      .pipe(
        tap(valid => {
          if (!valid) {
            this.router.navigateByUrl('/inicio')
          }
        })
      );
  }

  canLoad(): Observable<boolean> | boolean {
    return this.authService.validarTokenAdmin()
      .pipe(
        tap(valid => {
          if (!valid) {
            this.router.navigateByUrl('/inicio')
          }
        })
      );
  }
}
