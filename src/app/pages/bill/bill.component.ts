import { Component, OnInit } from '@angular/core';
import { ProductoService, PagerService } from '../../services/service.index';
import { Producto, Item } from '../../interfaces';


@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styles: []
})
export class BillComponent implements OnInit {

  public productos = [];
  public items = [];
  public producto = new Producto();
  public item = new Item();
  public Search = '';

  constructor(
    private productoService: ProductoService,
  ) { }

  ngOnInit() {
    this.GetAllProducts();
  }

  GetAllProducts() {
    this.productoService.GetProductos(res => {
      this.productos = res.productos;
    })
  }

  CreateItem()
  {

  }

}

