import { Component, OnInit } from '@angular/core';
import { Muestra } from 'src/app/muestras/interfaces/muestra.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  muestra!: Muestra;

  constructor() { }

  ngOnInit(): void {
  }

  setMuestra(muestra: Muestra) {
    this.muestra = muestra
    console.log(muestra);
    
  }

}
