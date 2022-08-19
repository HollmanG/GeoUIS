import { Pipe, PipeTransform } from '@angular/core';
import { Fotos } from '../interfaces/fotos.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  
  transform(foto: Fotos) : string {
    
    if(!foto){
      return 'assets/no-image.png';
    }
    return `http://localhost:8000/images/${foto.id_muestra}/${foto.foto}`;

  }

}
