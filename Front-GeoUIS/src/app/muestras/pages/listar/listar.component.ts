import { Component, OnInit } from '@angular/core';
import { Muestra } from '../../interfaces/muestra.interface';
import { MuestrasService } from '../../services/muestras.service';
import { AuthService } from '../../../auth/services/auth.service';

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


  }

  verificarRolAdmin() {
    if (this.usuario.rol == 2 || this.usuario.rol == 4) {
      return true;
    }
    return false;
  }

  verificarRolUsuario() {
    if (this.usuario.rol != undefined) {
      return true;
    }
    return false;
  }

}
