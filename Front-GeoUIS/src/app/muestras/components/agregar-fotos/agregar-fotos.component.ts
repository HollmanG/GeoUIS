import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Muestra } from 'src/app/muestras/interfaces/muestra.interface';

@Component({
  selector: 'app-agregar-fotos',
  templateUrl: './agregar-fotos.component.html',
  styleUrls: ['./agregar-fotos.component.css']
})
export class AgregarFotosComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AgregarFotosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Muestra) { }

  ngOnInit(): void {

  }

  cerrar(){
    this.dialogRef.close()
  }

}
