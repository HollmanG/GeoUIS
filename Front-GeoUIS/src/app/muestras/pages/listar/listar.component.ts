import { Component, OnInit } from '@angular/core';
import { MuestrasService } from '../../services/muestras.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  constructor(private muestrasService: MuestrasService) { }

  ngOnInit(): void {

    this.muestrasService.getMuestras()
      .subscribe(resp => console.log(resp));

  }

}
