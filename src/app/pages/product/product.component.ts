import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from '../../interfaces/index'

//Interfaces
import { Usuario } from '../../models/usuario.model';

//Servicio
import { ProductoService, PagerService, UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit {

  usuario: Usuario;
  public productos = [];
  public productoAdd = new Producto();
  public productoEdit = new Producto();
  public productoEliminar = new Producto();
  public productoVer = new Producto();
  public Search = '';

  private allItems: any[];
  public pager: any = {};
  public pagedItems = [];

  constructor(
    private productoService: ProductoService,
    private pagerService: PagerService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.GetAllProducts();
  }

  GetAllProducts() {
    this.productoService.GetProductos(res => {
      this.productos = res.productos;
      this.allItems = this.productos;
      this.setPage(1);
    })
  }

  AddNewProduct() {
    this.productoAdd.tenant_id = this.usuario._id;
    this.productoService.AddProducto(this.productoAdd, res => {
      this.GetAllProducts();
    })
  }

  EditarProducto() {

    console.log(this.productoEdit);

    this.productoService.EditProducto(this.productoEdit, res => {

      console.log(res);

    })
  }

  EliminarProducto()
  {
    this.productoService.EliminarProducto(this.productoEliminar, res=>{
      console.log(res);
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
