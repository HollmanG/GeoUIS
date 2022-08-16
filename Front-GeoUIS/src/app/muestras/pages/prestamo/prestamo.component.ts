import { Component, OnInit } from '@angular/core';
import { Muestra } from 'src/app/muestras/interfaces/muestra.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MuestrasService } from '../../services/muestras.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.css']
})
export class PrestamoComponent implements OnInit {

  muestra!: Muestra;

  constructor(private activatedRoute: ActivatedRoute,
    private muestraService: MuestrasService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({id})=> this.muestraService.getMuestraPorId(id))
    )
    .subscribe(muestra=>this.muestra = muestra)
  }

}
