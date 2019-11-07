import { Component, OnInit } from '@angular/core';

//Interfaces
import { Usuario } from '../../models/usuario.model';
import { Client } from '../../interfaces/index'

//Servicios
import { PagerService } from '../../services/shared/pager.service'
import { ClientesService, UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styles: []
})
export class ClientComponent implements OnInit {

  usuario: Usuario;
  public clientAdd = new Client();
  public clientEdit = new Client();
  public clientEliminar = new Client();
  public clientVer = new Client();
  client1: Client[] = [];

  constructor(private pagerService: PagerService, private clientesService: ClientesService, public _usuarioService: UsuarioService) {
  }

  private allItems: any[];
  public pager: any = {};
  public pagedItems = [];
  public Search: any = '';

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
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

  AddNewClient() {
    this.clientAdd.tenant_id = this.usuario._id;
    this.clientesService.AddCliente(this.clientAdd, res => {
      this.GetAllClients();
    })
  }

  EditarClient() {
    this.clientesService.EditProducto(this.clientEdit, res => {
      this.GetAllClients();
    })
  }

  restablcerCrearCliente() {
    this.clientAdd = new Client();
  }

}
