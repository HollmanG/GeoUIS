import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Muestra } from 'src/app/muestras/interfaces/muestra.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css']
})
export class ConfirmarComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConfirmarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Muestra) { }

  ngOnInit(): void {
  }
// Delete rock
  borrar(){
    this.dialogRef.close(true)
  }
// Close modal
  cerrar(){
    this.dialogRef.close()
  }

}
