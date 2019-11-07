import { Component, OnInit } from '@angular/core';
import { ProductoService, PagerService } from '../../services/service.index';
import { Producto } from '../../interfaces';

import { Client, Bill } from '../../interfaces/index'
import { ClientesService } from '../../services/service.index';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styles: []
})
export class BillComponent implements OnInit {

  public productos = [];
  client1: Client[] = [];
  public clientSeleccionado = new Client();
  public bill = new Bill();

  public productoAdd = new Producto();
  public productoEdit = new Producto();
  public productoEliminar = new Producto();
  public productoVer = new Producto();

  constructor(
    private productoService: ProductoService,
    private pagerService: PagerService,
    private clientesService: ClientesService,
  ) { }

  private allItems: any[];
  public pager: any = {};
  public pagedItems = [];
  public Search: any = '';

  ngOnInit() {
    this.GetAllClients();
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
      this.allItems = res.clients;
      this.setPage(1);
    })
  }

  capturalCliente(){

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
