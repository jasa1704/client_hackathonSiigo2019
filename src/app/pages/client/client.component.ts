import { Component, OnInit } from '@angular/core';

//Interfaces
import { Client } from '../../interfaces/index'

//Servicios
import { PagerService } from '../../services/shared/pager.service'
import { ClientesService } from '../../services/service.index';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styles: []
})
export class ClientComponent implements OnInit {

  client = new Client();
  client1: Client[] = [];

  constructor(private pagerService: PagerService, private clientesService: ClientesService) {
  }

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

}
