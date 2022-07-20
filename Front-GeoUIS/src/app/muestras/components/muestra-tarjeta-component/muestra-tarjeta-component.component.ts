import { Component, Input } from '@angular/core';
import { Muestra } from '../../interfaces/muestra.interface';

@Component({
  selector: 'app-muestra-tarjeta-component',
  templateUrl: './muestra-tarjeta-component.component.html',
  styleUrls: ['./muestra-tarjeta-component.component.css']
})
export class MuestraTarjetaComponentComponent {

  @Input() muestra!:Muestra;

  

}
