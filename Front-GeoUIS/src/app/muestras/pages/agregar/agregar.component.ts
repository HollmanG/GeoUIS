import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {

  get usuario(){
    return this.authService.usuario
  }

  constructor( private router: Router,
              private authService: AuthService) { }

  logOut(){
    this.router.navigateByUrl('/auth')
  }

}
