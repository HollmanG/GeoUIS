import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { switchMap } from 'rxjs';
import { Muestra } from '../../interfaces/muestra.interface';
import { MuestrasService } from '../../services/muestras.service';

@Component({
  selector: 'app-muestra',
  templateUrl: './muestra.component.html',
  styleUrls: ['./muestra.component.css']
})
export class MuestraComponent implements OnInit {

  muestra!: Muestra;

  constructor(private activatedRoute: ActivatedRoute,
              private muestraService: MuestrasService) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({id})=> this.muestraService.getMuestraPorId(id))
    )
    .subscribe(muestra=>this.muestra = muestra)

  }

}
