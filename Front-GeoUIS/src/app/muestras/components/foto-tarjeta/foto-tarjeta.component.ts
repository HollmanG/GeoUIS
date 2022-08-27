import { Component, Input, OnInit } from '@angular/core';
import { Fotos } from '../../interfaces/fotos.interface';

@Component({
  selector: 'app-foto-tarjeta',
  templateUrl: './foto-tarjeta.component.html',
  styleUrls: ['./foto-tarjeta.component.css']
})
export class FotoTarjetaComponent implements OnInit {

  @Input() Foto!: Fotos;

  constructor() { }

  ngOnInit(): void { 
  }

}
