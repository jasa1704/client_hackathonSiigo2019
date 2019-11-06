import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: string): any {

    let url = URL_SERVICIOS + '/img';

    if ( !img ) {
      return url + '/usuarios/xxx';
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }
    switch ( tipo ) {

      case 'admin':
        url += '/admin/' + img;
      break;

      case 'therapist':
        url += '/therapist/' + img;
      break;

      case 'patient':
         url += '/patient/' + img;
      break;

      default:
        console.log('tipo de imagen no existe, therapist, admin, patient');
        url += '/usurios/xxx';
    }
    return url;
  }

}
