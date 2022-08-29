import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Muestra } from 'src/app/muestras/interfaces/muestra.interface';

@Component({
  selector: 'app-agregar-fotos',
  templateUrl: './agregar-fotos.component.html',
  styleUrls: ['./agregar-fotos.component.css']
})
export class AgregarFotosComponent implements OnInit {

  public archivos: any = [];

  constructor(private dialogRef: MatDialogRef<AgregarFotosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Muestra,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

  }

  cerrar(){
    this.dialogRef.close()
  }

  capturarFile(event:any):any{
    const archivoCapturado = event.target.files[0];
    this.archivos.push(archivoCapturado);
    console.log(event.target.files);
  }

  extraerbase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          blob: $event,
          image,
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

}
