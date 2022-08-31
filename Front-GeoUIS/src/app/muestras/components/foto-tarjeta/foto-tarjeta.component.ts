import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Fotos } from '../../interfaces/fotos.interface';
import { FotosService } from '../../services/fotos.service';

@Component({
  selector: 'app-foto-tarjeta',
  templateUrl: './foto-tarjeta.component.html',
  styleUrls: ['./foto-tarjeta.component.css']
})
export class FotoTarjetaComponent implements OnInit {

  @Input() Foto!: Fotos;

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              private fotosService: FotosService) { }

  ngOnInit(): void { 
  }

  EliminarFoto(){
    this.fotosService.borrarFoto(this.Foto.id_foto!)
    .subscribe(resp => {
      this.mostrarSnackBar('Foto Eliminada');
      setTimeout(()=>{  
        window.location.reload();
      }, 1000);
    })
  }

  mostrarSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 2500
    })
  }

}
