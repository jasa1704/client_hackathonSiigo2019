import { Component, OnInit } from '@angular/core';
import { ProductoService, PagerService, UsuarioService } from '../../services/service.index';
import { Producto, Item } from '../../interfaces';

import { Client, Bill } from '../../interfaces/index'
import { ClientesService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

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

  usuario: Usuario;

  client1: Client[] = [];
  public clientSeleccionado = new Client();
  public bill = new Bill();

  constructor(
    private productoService: ProductoService,
    private pagerService: PagerService,
    private clientesService: ClientesService,
    private _usuarioService: UsuarioService
  ) { }

  private allItems: any[];
  public pager: any = {};
  public pagedItems = [];

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;

    this.GetAllClients();
    this.GetAllProducts();
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  GetAllClients()
  {
    this.clientesService.GetClientes(res=>{
      this.client1 = res.clients;
      //this.allItems = res.clients;
      //this.setPage(1);
    })
  }

  GetAllProducts() {
    this.productoService.GetProductos(res => {
      this.productos = res.productos;
    })
  }

  CreateItem()
  {
    this.item.tenant_id = this.usuario._id;
    this.item.product_id = this.producto._id;
    this.productoService.CrearItem(this.item, res=>{
      console.log(res)
    })

  }

}

