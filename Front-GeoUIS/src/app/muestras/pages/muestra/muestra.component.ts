import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from 'rxjs';
import { Fotos } from '../../interfaces/fotos.interface';
import { Muestra } from '../../interfaces/muestra.interface';
import { Municipio } from '../../interfaces/municipios.interface';
import { FotosService } from '../../services/fotos.service';
import { MuestrasService } from '../../services/muestras.service';
import { FiltrosService } from '../../services/filtros.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-muestra',
  templateUrl: './muestra.component.html',
  styleUrls: ['./muestra.component.css']
})
export class MuestraComponent implements OnInit {

  fotos: Fotos[] = [];

  fotoCarrusel: Fotos | undefined;

  muestra!: Muestra;

  municipio: Municipio = {
    id_municipio : "0",
    nombre : ""
  }

  get usuario() {
    return this.authService.usuario
  }

  constructor(private activatedRoute: ActivatedRoute,
    private muestraService: MuestrasService,
    private fotosService: FotosService,
    private filtrosService: FiltrosService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.muestraService.getMuestraPorId(id))
      )
      .subscribe(muestra => {
        this.muestra = muestra;
        this.filtrosService.getMunicipio(muestra.id_municipio!)
          .subscribe(municipio => this.municipio = municipio)
      })

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.fotosService.getFotos(id))
      )
      .subscribe(fotos => {
        this.fotos = fotos;
        this.fotoCarrusel = fotos.shift();
      });

  }

  regresar() {
    this.router.navigate(['/muestra/listar']);
  }

  verificarRolUsuario() {
    if (this.usuario.rol != undefined) {
      return true;
    }
    return false;
  }

}
