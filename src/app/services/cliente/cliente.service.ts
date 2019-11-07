import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import swal from 'sweetalert';

//Interfaz
import { Client } from '../../interfaces/index'

@Injectable()
export class ClientesService {

  constructor(public http: HttpClient) { }

  GetClientes(callback) {
    let url = URL_SERVICIOS + '/clientes';

    this.http.get(url).subscribe((resp: any) => {
      return callback(resp);
    }, error => {
      swal('Problema en el servidor', error.error.mensaje, 'error');
    })

  }

  AddCliente(cliente: Client, callback)
  {
    let url = URL_SERVICIOS + '/clientes';
    this.http.post(url, cliente).subscribe((resp:any)=>{
      swal('Cliente creado', cliente.email, 'success');
      return callback(resp);
    }, error => {
      swal('Problema en el servidor', error.error.mensaje, 'error');
    })

  }

  EditProducto(cliente: Client, callback)
  {
    let url = URL_SERVICIOS + '/clientes/'+cliente._id;
    this.http.post(url, cliente).subscribe((resp:any)=>{
      swal('Cliente editado', cliente.email, 'success');
      return callback(resp);
    }, error => {
      swal('Problema en el servidor', error.error.mensaje, 'error');
    })

  }

}
