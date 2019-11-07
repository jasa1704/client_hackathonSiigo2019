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

      case 'client':
        url += '/client/' + img;
      break;

      case 'patient':
         url += '/patient/' + img;
      break;

      default:
        console.log('tipo de imagen no existe, client, admin, patient');
        url += '/usurios/xxx';
    }
    return url;
  }

}
