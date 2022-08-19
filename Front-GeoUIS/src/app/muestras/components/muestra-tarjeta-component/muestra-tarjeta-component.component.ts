import { Component, Input, OnInit } from '@angular/core';
import { Muestra } from '../../interfaces/muestra.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { Fotos } from '../../interfaces/fotos.interface';
import { FotosService } from '../../services/fotos.service';


@Component({
  selector: 'app-muestra-tarjeta-component',
  templateUrl: './muestra-tarjeta-component.component.html',
  styleUrls: ['./muestra-tarjeta-component.component.css']
})
export class MuestraTarjetaComponentComponent implements OnInit {

  @Input() muestra!: Muestra;

  fotos: Fotos[] = [];

  get usuario() {
    return this.authService.usuario
  }

  constructor(private authService: AuthService,
              private fotosService: FotosService) { }

  ngOnInit(): void {
    this.authService.validarToken()
    .subscribe();

    this.fotosService.getFotos(this.muestra.id_muestra!)
    .subscribe(fotos => this.fotos = fotos);
    
  }

  verificarRolAdmin() {
    if (this.usuario.rol == 2 || this.usuario.rol == 4) {
      return true;
    }
    return false;
  }

  

}
