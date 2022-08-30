import { Component, OnInit } from '@angular/core';
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
              private prestamoService: PrestamosService) { }

  ngOnInit(): void { 

    this.prestamoService.getPrestamos()
    .subscribe(prestamos => this.prestamos = prestamos);

  }

}
