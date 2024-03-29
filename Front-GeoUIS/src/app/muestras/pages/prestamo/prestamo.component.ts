import { Component, OnInit } from '@angular/core';
import { Muestra } from 'src/app/muestras/interfaces/muestra.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MuestrasService } from '../../services/muestras.service';
import { switchMap } from 'rxjs';
import { Fotos } from '../../interfaces/fotos.interface';
import { FotosService } from '../../services/fotos.service';
import { PrestamosService } from '../../services/prestamos.service';
import { Prestamo } from '../../interfaces/prestamos.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.css']
})
export class PrestamoComponent implements OnInit {

  muestra: Muestra = {
    nombre: "",
    codigo: "",
    id_tipo_muestra: 0,
    id_localizacion: 0,
    id_ubicacion: 0,
    seccion_delgada: false
  }

  prestamo: Prestamo = {};

  disponible: Boolean = true;

  fotos: Fotos[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private muestraService: MuestrasService,
    private fotosService: FotosService,
    private prestamosService: PrestamosService,
    private snackBar: MatSnackBar,
    private router: Router,
    public datepipe: DatePipe) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.muestraService.getMuestraPorId(id))
      )
      .subscribe(muestra => this.muestra = muestra)

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.prestamosService.getDisponible(id))
      )
      .subscribe(disponible => this.disponible = disponible)


    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.fotosService.getFotos(id))
      )
      .subscribe(fotos => this.fotos = fotos);
  }
  // back page
  regresar() {
    this.router.navigate(['/muestra/', this.muestra.id_muestra]);
  }
  // borrow sample
  perdirPrestamo() {

    const fechaActual = new Date();
    const fechaActualString = this.datepipe.transform(Date.now(), 'dd/MM/yyyy');
    var fechaPuesta: Date = new Date(this.prestamo.fecha_prestamo!)
    fechaPuesta.setDate(fechaPuesta.getDate() + 1)
    console.log(fechaActual);
    console.log(fechaPuesta);

    if (fechaPuesta < fechaActual) {
      this.mostrarSnackBar("Fecha incorrecta, por favor seleccione una fecha posterior día " + fechaActualString);
      return
    }

    this.prestamo.id_muestra = this.muestra.id_muestra;

    if (this.prestamo.id_muestra == undefined || this.prestamo.fecha_prestamo == undefined) {
      return;
    }

    this.prestamosService.agregarPrestamo(this.prestamo)
      .subscribe(prestamo => {
        this.router.navigate(['/muestra/', prestamo.id_muestra]);
        this.mostrarSnackBar("Prestamo exitoso, por favor acercarse a " + this.muestra.ubicacion + " para recoger a " + this.muestra.nombre);
      })
  }

  // open snackbar
  mostrarSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 5000
    })
  }

}
