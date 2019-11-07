import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Producto, Item } from '../../interfaces/index'



@Injectable()
export class ProductoService {

  constructor(
    public http: HttpClient,

  ) { }

  EliminarProducto(producto, callback){
    let url = URL_SERVICIOS + '/productos/delete/'+producto._id;

    this.http.post(url, producto).subscribe((res:any)=>{
      return callback(res);
    })
  }



  GetProductos(callback)
  {
    let url = URL_SERVICIOS + '/productos';
    
    this.http.get(url).subscribe(( resp:any)=>{
      return callback(resp);
    }, error => {
      
    })
  }
  
  AddProducto(producto: Producto, callback)
  {
    let url = URL_SERVICIOS + '/productos/';
    this.http.post(url, producto).subscribe((resp:any)=>{
      return callback(resp);
    })

  }

  EditProducto(producto: Producto, callback)
  {
    let url = URL_SERVICIOS + '/productos/'+producto._id;
    this.http.post(url, producto).subscribe((resp:any)=>{
      return callback(resp);
    })

  }

  CrearItem(item: Item, callback)
  {
    let url = URL_SERVICIOS + '/items/create';
    this.http.post(url, item).subscribe((resp:any) =>{
      return(callback);
    })


  }

}
