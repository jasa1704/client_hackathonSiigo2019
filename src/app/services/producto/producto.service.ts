import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import swal from 'sweetalert';

//Interfaz
import { Producto, Item } from '../../interfaces/index'


@Injectable()
export class ProductoService {

  constructor(
    public http: HttpClient,

  ) { }

  EliminarProducto(producto, callback) {
    let url = URL_SERVICIOS + '/productos/delete/' + producto._id;

    this.http.post(url, producto).subscribe((res: any) => {
      return callback(res);
    })
  }

  GetProductos(callback) {
    let url = URL_SERVICIOS + '/productos';

    this.http.get(url).subscribe((resp: any) => {
      return callback(resp);
    }, error => {

    })
  }

  AddProducto(producto: Producto, callback) {
    let url = URL_SERVICIOS + '/productos';
    this.http.post(url, producto).subscribe((resp: any) => {
      swal('Producto creado', producto.nombre, 'success');
      return callback(resp);
    })

  }

  EditProducto(producto: Producto, callback) {
    let url = URL_SERVICIOS + '/productos/' + producto._id;
    this.http.post(url, producto).subscribe((resp: any) => {
      swal('Producto actualizado ', producto.nombre, 'success');
      return callback(resp);
    })

  }

  CrearItem(item: Item, callback) {

    console.log('item',item)
    let url = URL_SERVICIOS + '/items/create';
    this.http.post(url, item).subscribe((resp: any) => {
      return (callback);
    })
  }
  //Objeto creado para importar base de datos externas
  OnUploadBaseDatos(type: string, selectedFile: File, tenant_id: string, callback) {
    let formData: FormData = new FormData();
    formData.append('uploadFile', selectedFile, selectedFile.name);
    formData.append('type', type);
    formData.append('tenant_id', tenant_id);
    let url = URL_SERVICIOS + '/productos/upload/csv';
    this.http.post(url, formData).subscribe((resp: any) => {
      callback(resp);
    }, error => {
      callback(error);
    });
  }

}
