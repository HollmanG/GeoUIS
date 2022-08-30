import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Fotos } from '../../interfaces/fotos.interface';
import { Prestamo } from '../../interfaces/prestamos.interface';
import { FotosService } from '../../services/fotos.service';

@Component({
  selector: 'app-prestamo-tarjeta',
  templateUrl: './prestamo-tarjeta.component.html',
  styleUrls: ['./prestamo-tarjeta.component.css']
})
export class PrestamoTarjetaComponent implements OnInit {

  @Input() prestamo!: Prestamo;

  get usuario() {
    return this.authService.usuario
  }

  fotos: Fotos[] = [];

  constructor(private authService: AuthService,
    private fotosService: FotosService) { }

  ngOnInit(): void {
    
    this.fotosService.getFotos(this.prestamo.id_muestra!)
    .subscribe(fotos => this.fotos = fotos);
  }

}
