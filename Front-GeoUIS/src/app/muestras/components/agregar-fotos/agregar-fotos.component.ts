import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Muestra } from 'src/app/muestras/interfaces/muestra.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { FotosService } from '../../services/fotos.service';

@Component({
  selector: 'app-agregar-fotos',
  templateUrl: './agregar-fotos.component.html',
  styleUrls: ['./agregar-fotos.component.css']
})
export class AgregarFotosComponent implements OnInit {

  public archivos: any = [];

  public previsualizacion: string = "";

  constructor(private dialogRef: MatDialogRef<AgregarFotosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Muestra,
    private sanitizer: DomSanitizer,
    private router: Router,
    private fotosService: FotosService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

  }

  cerrar(){
    this.dialogRef.close()
  }

  capturarFile(event:any):any{
    const archivoCapturado = event.target.files[0];
    this.extraerbase64(archivoCapturado).then((imagen:any) => {
      this.previsualizacion = imagen.base;
    })
    this.archivos.push(archivoCapturado);
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


  subirArchivo():any {
    try {

      const datosformulario = new FormData();
      this.archivos.forEach((archivoFoto:any) => {
        datosformulario.append('foto', archivoFoto)
      });
      datosformulario.append('id_muestra', this.data.id_muestra!.toString())

      this.fotosService.agregarFoto(datosformulario)
      .subscribe(resp =>{
        window.location.reload();
      });

    } catch (e) {
      console.log('ERROR', e);

    }
  }

}
