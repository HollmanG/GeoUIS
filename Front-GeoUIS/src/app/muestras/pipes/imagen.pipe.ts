import { Pipe, PipeTransform } from '@angular/core';
import { Muestra } from '../interfaces/muestra.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(muestra: Muestra): string {
    return `assets/heroes/${muestra.id}.jpg`;
  }

}
