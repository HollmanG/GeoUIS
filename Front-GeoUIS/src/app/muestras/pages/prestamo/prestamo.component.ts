import { Component, OnInit } from '@angular/core';
import { Muestra } from 'src/app/muestras/interfaces/muestra.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MuestrasService } from '../../services/muestras.service';
import { switchMap } from 'rxjs';
import { Fotos } from '../../interfaces/fotos.interface';
import { FotosService } from '../../services/fotos.service';
import { PrestamosService } from '../../services/prestamos.service';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.css']
})
export class PrestamoComponent implements OnInit {

  muestra: Muestra = {
    nombre: "",
    codigo: "",
    id_tipo_muestra: 0
  }

  disponible : Boolean = true;

  fotos: Fotos[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private muestraService: MuestrasService,
    private fotosService: FotosService,
    private prestamosService: PrestamosService,
    private router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      switchMap(({id})=> this.muestraService.getMuestraPorId(id))
    )
    .subscribe(muestra=>this.muestra = muestra)

    this.activatedRoute.params
    .pipe(
      switchMap(({id})=> this.prestamosService.getDisponible(id))
    )
    .subscribe(disponible=>this.disponible = disponible)


    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.fotosService.getFotos(id))
      )
      .subscribe(fotos => this.fotos = fotos);
  }

  regresar() {
    this.router.navigate(['/muestra/',this.muestra.id_muestra]);
  }

}
