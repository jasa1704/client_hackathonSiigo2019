import { Component, OnInit } from '@angular/core';
import { ProductoService, PagerService } from '../../services/service.index';
import { Producto } from '../../interfaces/index'


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit {

  public productos = [];
  public productoAdd = new Producto();
  public productoEdit = new Producto();
  public Search = '';

  private allItems: any[];
  public pager: any = {};
  public pagedItems = [];

  constructor(
    private productoService: ProductoService,
    private pagerService: PagerService
  ) { }

  ngOnInit() {

    this.GetAllProducts();
  }



  GetAllProducts()
  {
    this.productoService.GetProductos(res=>{
      this.productos = res.productos;
      this.allItems = this.productos;
      this.setPage(1);
    })
  }

  AddNewProduct()
  {
    this.productoService.AddProducto(this.productoAdd, res => {
      this.GetAllProducts();
    })

  }

  restablcerCrearProducto() {
    this.productoAdd = new Producto();
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
