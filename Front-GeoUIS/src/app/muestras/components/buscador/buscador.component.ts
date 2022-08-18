import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Muestra } from '../../interfaces/muestra.interface';
import { MuestrasService } from '../../services/muestras.service';
import { Fotos } from '../../interfaces/fotos.interface';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  @Output() muestraOut = new EventEmitter<Muestra>();

  termino:string = '';
  muestras: Muestra[] = [];
  muestraSeleccionada!: Muestra;

  fotos!: Fotos[];

  constructor(private muestrasService:MuestrasService,
              private router: Router) { }

  ngOnInit(): void {
  }

  buscando() {
    this.muestrasService.getSugerencias(this.termino.trim())
    .subscribe(muestras=>this.muestras = muestras)
  }

  outputMuestra(muestra: Muestra) {
    this.muestraOut.emit(muestra);
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    
    if(!event.option.value) {
      return;
    }

    const muestra: Muestra = event.option.value;
    this.termino = muestra.nombre!;
    
    this.muestrasService.getMuestraPorId(muestra.id_muestra!)
    .subscribe(muestra => this.muestraSeleccionada = muestra);
    
    this.outputMuestra(muestra);

    this.router.navigate([`/muestra/${muestra.id_muestra}`]);
  }

}
