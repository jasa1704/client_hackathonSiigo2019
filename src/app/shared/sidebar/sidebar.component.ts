import { Component, OnInit, ViewChild } from '@angular/core';

//Servicios
import { SidebarService } from '../../services/service.index';

//Interfaces
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;

  constructor(
    public _sidebar: SidebarService,
  ) {
  }

  ngOnInit() {
    this._sidebar.cargarMenu();
  }

}
