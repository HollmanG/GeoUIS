import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { MuestrasService } from '../../services/muestras.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Muestra } from '../../interfaces/muestra.interface';
import { switchMap } from 'rxjs/operators';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Fotos } from '../../interfaces/fotos.interface';
import { FotosService } from '../../services/fotos.service';
import { Municipio } from '../../interfaces/municipios.interface';
import { FiltrosService } from '../../services/filtros.service';
import { TipoMuestra } from '../../interfaces/muestra.interface';
import { Ubicacion } from '../../interfaces/ubicaciones.interface';
import { AgregarFotosComponent } from '../../components/agregar-fotos/agregar-fotos.component';
import { PrestamosService } from '../../services/prestamos.service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})

export class AgregarComponent implements OnInit {

  fotos: Fotos[] = [];

  municipios: Municipio[] = [];

  tiposMuestra: TipoMuestra[] = [];

  ubicaciones: Ubicacion[] = [];

  disponible: Boolean = true;

  get usuario() {
    return this.authService.usuario
  }

  muestra: Muestra = {
    codigo: "",
    id_tipo_muestra: 0,
    nombre: "",
    id_localizacion: 0,
    id_ubicacion: 0,
    seccion_delgada: false
  }

  constructor(private router: Router,
    private authService: AuthService,
    private muestraService: MuestrasService,
    private fotosService: FotosService,
    private filtrosService: FiltrosService,
    private activatedRoute: ActivatedRoute,
    private prestamosService: PrestamosService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public datepipe: DatePipe) {

  }

  ngOnInit(): void {

    this.filtrosService.getTiposMuestras()
      .subscribe(tipos => { this.tiposMuestra = tipos });

    this.filtrosService.getMunicipios()
      .subscribe(municipios => this.municipios = municipios);

    this.filtrosService.getUbicaciones()
      .subscribe(ubicaciones => this.ubicaciones = ubicaciones);

    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.muestraService.getMuestraPorId(id))
      )
      .subscribe(muestra => this.muestra = muestra);


    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.fotosService.getFotos(id))
      )
      .subscribe(fotos => this.fotos = fotos);

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.prestamosService.getDisponible(id))
      )
      .subscribe(disponible => this.disponible = disponible)



  }
  // save sample
  guardar() {
    if (this.muestra.nombre!.trim().length === 0 || this.muestra.id_tipo_muestra == undefined || this.muestra.codigo == undefined ||
      this.muestra.id_ubicacion == undefined || this.muestra.seccion_delgada == undefined || this.muestra.id_municipio == undefined
    ) {
      this.mostrarSnackBar('Hay campos requeridos sin diligenciar.');
      return;
    }
    
    if (this.muestra.id_muestra) {
      //update
      this.muestraService.actualizarMuestra(this.muestra).subscribe(muestra => this.mostrarSnackBar('Registro actualizado'))
    } else {
      //create
      this.muestraService.agregarMuestra(this.muestra).subscribe(muestra => {
        this.router.navigate(['/muestra/editar/', muestra.id_muestra]);
        this.mostrarSnackBar('Registro Creado');
      })

    }

  }
  // delete sample
  borrar() {

    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '300px',
      data: this.muestra
    })

    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.muestraService.borrarMuestra(this.muestra.id_muestra!)
            .subscribe(resp => {
              this.router.navigate(['/muestra/listar'])
            })
        }
      }
    )
  }
  // open modal images
  agregar() {
    const dialog = this.dialog.open(AgregarFotosComponent, {

      data: this.muestra
    })
  }

  // open snackbar
  mostrarSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 2500
    })
  }
  // back page
  regresar() {
    this.router.navigate(['/muestra/listar']);
  }
  // return load
  Devolver() {
    const fechaActual = this.datepipe.transform(Date.now(), 'yyyy-MM-dd');
    this.prestamosService.DevolverPrestamo(this.muestra.id_muestra!, fechaActual!)
      .subscribe(resp => {
        this.router.navigate(['/muestra/listar']);
        this.mostrarSnackBar('Muestra devuelta')
      })
  }

}
