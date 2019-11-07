import { Component, OnInit } from '@angular/core';
import { ProductoService, PagerService } from '../../services/service.index';
import { ProductComponent } from '../product/product.component';
import { Producto } from '../../interfaces';


@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styles: []
})
export class BillComponent implements OnInit {

  public productos = [];


  public productoAdd = new Producto();
  public productoEdit = new Producto();
  public productoEliminar = new Producto();
  public productoVer = new Producto();

  constructor(
    private productoService: ProductoService,

  ) { }

  ngOnInit() {
  }

  GetAllProducts() {
    this.productoService.GetProductos(res => {
      this.productos = res.productos;
    })
  }

  AddNewProduct() {
    this.productoService.AddProducto(this.productoAdd, res => {
      this.GetAllProducts();
    })

  }


}
