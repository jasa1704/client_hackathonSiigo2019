import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';


@Injectable()
export class ProductoService {

  constructor(
    public http: HttpClient,

  ) { }



  GetProductos(callback)
  {
    let url = URL_SERVICIOS + '/productos';

    this.http.get(url).subscribe(( resp:any)=>{
      return callback(resp);
    }, error => {

    })



  }

}
