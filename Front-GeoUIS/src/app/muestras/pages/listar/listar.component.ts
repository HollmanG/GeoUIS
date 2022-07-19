import { Component, OnInit } from '@angular/core';
import { Muestra } from '../../interfaces/muestra.interface';
import { MuestrasService } from '../../services/muestras.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  muestras: Muestra[] = [];

  constructor(private muestrasService: MuestrasService) { }

  ngOnInit(): void {

    this.muestrasService.getMuestras()
      .subscribe(muestras => { this.muestras = muestras });

  }

}
