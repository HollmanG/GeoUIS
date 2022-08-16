import { Component, Input, OnInit } from '@angular/core';
import { Muestra } from '../../interfaces/muestra.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-muestra-tarjeta-component',
  templateUrl: './muestra-tarjeta-component.component.html',
  styleUrls: ['./muestra-tarjeta-component.component.css']
})
export class MuestraTarjetaComponentComponent implements OnInit {

  @Input() muestra!: Muestra;

  get usuario() {
    return this.authService.usuario
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.validarToken()
    .subscribe();
    
  }

  verificarRolAdmin() {
    if (this.usuario.rol == 2 || this.usuario.rol == 4) {
      return true;
    }
    return false;
  }

}
