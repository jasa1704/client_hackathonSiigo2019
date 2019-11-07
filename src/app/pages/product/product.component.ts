import { Component, OnInit } from '@angular/core';

//Interfaz
import { Producto } from '../../interfaces/index'

//Servicio
import { ProductoService } from '../../services/service.index';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit {

  public productos = [];
  public producto = new Producto();
  public Search = '';

  constructor(
    private productoService: ProductoService
  ) { }

  ngOnInit() {

    this.GetAllProducts();
  }

  GetAllProducts()
  {
    this.productoService.GetProductos(res=>{
      this.productos = res.productos;
    })
  }

}
