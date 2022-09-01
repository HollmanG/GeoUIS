import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Prestamo } from '../../interfaces/prestamos.interface';
import { PrestamosService } from '../../services/prestamos.service';

@Component({
  selector: 'app-listar-prestamo',
  templateUrl: './listar-prestamo.component.html',
  styleUrls: ['./listar-prestamo.component.css']
})
export class ListarPrestamoComponent implements OnInit {

  get usuario() {
    return this.authService.usuario
  }

  prestamos: Prestamo[] = [];

  constructor(private authService: AuthService,
              private prestamoService: PrestamosService,
              private router: Router) { }

  ngOnInit(): void { 

    if(this.usuario.rol == 2 || this.usuario.rol ==4){
      this.prestamoService.getPrestamos()
    .subscribe(prestamos => this.prestamos = prestamos);
    } else{
      this.prestamoService.getPrestamo(this.usuario.id)
    .subscribe(prestamos => this.prestamos = prestamos);
    }

  }

  regresar() {
    this.router.navigate(['/muestra/listar']);
  }

  VisualizarCard(prestamo: Prestamo){
    if(this.usuario.rol == 2 || this.usuario.rol ==4){
      return true;
    }else{
      if(this.usuario.id == prestamo.id_usuario){
        return true;
      }else{
        return false;
      }
    }
  }

}
