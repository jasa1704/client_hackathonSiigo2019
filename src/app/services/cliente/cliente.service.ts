import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import swal from 'sweetalert';

@Injectable()
export class ClientesService {

  constructor(public http: HttpClient) { }

  GetClientes(callback) {
    let url = URL_SERVICIOS + '/clientes';

    this.http.get(url).subscribe((resp: any) => {
      return callback(resp);
    }, error => {
      swal('Error en el servidor', error.error.mensaje, 'error');
    })

  }

}
