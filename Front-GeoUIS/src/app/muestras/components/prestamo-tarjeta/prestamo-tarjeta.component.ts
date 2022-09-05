import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Fotos } from '../../interfaces/fotos.interface';
import { Prestamo } from '../../interfaces/prestamos.interface';
import { FotosService } from '../../services/fotos.service';
import { PrestamosService } from '../../services/prestamos.service';

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

  disponible: boolean = false;

  fotos: Fotos[] = [];

  constructor(private authService: AuthService,
    private fotosService: FotosService,
    private prestamoService: PrestamosService,
    public datepipe: DatePipe,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // upload requests
    this.fotosService.getFotos(this.prestamo.id_muestra!)
      .subscribe(fotos => this.fotos = fotos);

    this.prestamoService.getDisponible(this.prestamo.id_muestra!)
      .subscribe(resp => {
        this.disponible = resp;
      })
  }
  // verify loan
  prestamoDisponible() {
    if (this.prestamo.fecha_devolucion == null) {
      if (this.usuario.rol == 2 || this.usuario.rol == 4) {
        return true
      }
    }
    return false

  }
  // return rock
  Devolver() {
    const fechaActual = this.datepipe.transform(Date.now(), 'yyyy-MM-dd');
    this.prestamoService.DevolverPrestamo(this.prestamo.id_muestra!, fechaActual!)
      .subscribe(resp => {
        this.mostrarSnackBar('Muestra devuelta')
        setTimeout(() => {
          window.location.reload();
        }, 2000);

      })
  }
  // open snackbar
  mostrarSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 2500
    })
  }

}
