import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Muestra } from '../../interfaces/muestra.interface';
import { MuestrasService } from '../../services/muestras.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  termino:string = '';
  muestras: Muestra[] = [];
  muestraSeleccionada!: Muestra;

  constructor(private muestrasService:MuestrasService) { }

  ngOnInit(): void {
  }

  buscando() {
    this.muestrasService.getMuestras()
    .subscribe(muestras=>this.muestras = muestras)
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    
    const muestra: Muestra = event.option.value;
    this.termino = muestra.superhero;
    
    this.muestrasService.getMuestraPorId(muestra.id!)
    .subscribe(muestra => this.muestraSeleccionada = muestra)
    
  }

}
