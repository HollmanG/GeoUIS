import { Pipe, PipeTransform } from '@angular/core';
import { Muestra } from '../interfaces/muestra.interface';
import { Fotos } from '../interfaces/fotos.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  
  transform(foto: Fotos): string {
    
      return `assets/heroes/${foto.foto}`;

  }

}
