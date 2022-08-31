import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Muestra } from 'src/app/muestras/interfaces/muestra.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  muestra!: Muestra;

  get usuario() {
    return this.authService.usuario
  }

  constructor( private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if(token != null){
      
      this.authService.validarTokenUsuario()
        .subscribe();
    }
  }

  setMuestra(muestra: Muestra) {
    this.muestra = muestra
    console.log(muestra);
    
  }

  logOut() {
    this.authService.logOut();
  }

}
