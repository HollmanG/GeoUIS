import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { MuestrasService } from '../../services/muestras.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Muestra } from '../../interfaces/muestra.interface';
import { switchMap } from 'rxjs/operators';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})

export class AgregarComponent implements OnInit {

  get usuario() {
    return this.authService.usuario
  }

  muestra: Muestra = {
    caracteristicas_fisicas: "",
    codigo: "",
    id_tipo_muestra: 0,
    nombre: ""
  }

  constructor(private router: Router,
    private authService: AuthService,
    private muestraService: MuestrasService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    console.log("rol usuario " + this.usuario.rol)

    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.muestraService.getMuestraPorId(id))
      )
      .subscribe(muestra => this.muestra = muestra);

      

  }

  guardar() {
    if (this.muestra.nombre.trim().length === 0) {
      return;
    }

    if (this.muestra.id_muestra) {
      //actualizar
      this.muestraService.actualizarMuestra(this.muestra).subscribe(muestra => this.mostrarSnackBar('Registro actualizado'))
    } else {
      //crear
      this.muestraService.agregarMuestra(this.muestra).subscribe(muestra => {
        this.router.navigate(['/muestras/editar/', muestra.id_muestra]);
        this.mostrarSnackBar('Registro Creado');
      })

    }

  }

  borrar() {

    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.muestra
    })

    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.muestraService.borrarMuestra(this.muestra.id_muestra!)
            .subscribe(resp => {
              this.router.navigate(['/muestras'])
            })
        }
      }
    )
  }


  mostrarSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 2500
    })
  }

  logOut() {
    this.router.navigateByUrl('/auth');
    this.authService.logOut();
  }

  regresar() {
    this.router.navigate(['/muestra/listar']);
  }

}
