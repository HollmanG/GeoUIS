import { Component, OnInit } from '@angular/core';
import { Muestra } from '../../interfaces/muestra.interface';
import { MuestrasService } from '../../services/muestras.service';
import { AuthService } from '../../../auth/services/auth.service';
import { CanActivate } from '@angular/router';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  get usuario() {
    return this.authService.usuario
  }

  muestras: Muestra[] = [];

  constructor(private muestrasService: MuestrasService,
              private authService: AuthService) { }

  ngOnInit(): void {

    this.muestrasService.getMuestras()
      .subscribe(muestras => { this.muestras = muestras });

      console.log("rol usuario " + this.usuario.rol)

  }

  CanActivate(){
    this.authService.validarToken();
  }

  verificarRolAdmin(){
    
    if(this.usuario.rol == 2 || this.usuario.rol == 4){
      return true;
    }
    return false;
  }

}
