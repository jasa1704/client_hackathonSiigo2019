import {Injectable} from '@angular/core';

@Injectable()
export class UtilitiesService {

  constructor(

  ) {}

  // Metodo para separar las palabras de un string y retornar un array de las mismas
  static convertirOracion(search: string) {
    let existeEspacioAlFinal: boolean = false;
    let index: any;
    let palabra: any;
    let palabras: any = [];
    while (search.indexOf(' ') !== -1) {
      index = search.indexOf(' ');
      palabra = search.substring(0, index);
      palabras.push(palabra);
      if (index + 1 === search.length) {
        existeEspacioAlFinal = true;
        break;
      } else {
        search = search.substring(index + 1, search.length);
      }
    }
    if (!existeEspacioAlFinal) palabras[palabras.length] = search;
    return palabras;
  };

}


