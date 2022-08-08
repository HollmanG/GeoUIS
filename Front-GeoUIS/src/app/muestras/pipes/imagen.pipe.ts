import { Pipe, PipeTransform } from '@angular/core';
import { Muestra } from '../interfaces/muestra.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(muestra: Muestra): string {
    if(!muestra.id && !muestra.alt_img){
      return 'assets/no-image.png';
    } else if (muestra.alt_img){
      return muestra.alt_img;
    } else {
      return `assets/heroes/${muestra.id}.jpg`;
    }
  }

}
