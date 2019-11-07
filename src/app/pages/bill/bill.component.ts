import { Component, OnInit } from '@angular/core';
import { ProductoService, PagerService, UsuarioService, FilesService } from '../../services/service.index';
import { Producto, Item } from '../../interfaces';
import Config from '../../config/config';
import { Client, Bill } from '../../interfaces/index'
import { ClientesService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import * as jsPDF from 'jspdf';


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
    private fs: FilesService,
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
    this.GetItems();
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

  GetItems() {

    this.productoService.GetItems(res=>{
      this.items = res.items;
    })

  }

  CreateItem()
  {
    this.item.tenant_id = this.usuario._id;
    this.item.product_id = this.producto._id;
    this.productoService.CrearItem(this.item, res=>{
      console.log(res);
      this.GetItems();
    })
  }

  async downloadReport(ids) {

    let doc = new jsPDF('l', 'mm', 'letter');
    const fileName = 'Factura_Siigo' + '.pdf';

    let pageWidth = doc.internal.pageSize.getWidth();
    let pageHigh = doc.internal.pageSize.getHeight();

    let curPosition;

    let margin = Config.marginPaper;

    margin.right = pageWidth - Config.base;
    margin.down = pageHigh - Config.base;

    let paper = {
      width: margin.right - margin.left,
      high: margin.down - margin.up,
    }

    let bodyPaper = Config.bodyPaper;


    //Cuerpo del informe
    doc.setFontSize(11);


    //this.fs.createTable(doc, body, bodyPaper.startWithTitle, null, paper.width / 2);
    //this.fs.createTable(doc, '#my-table', doc.lastAutoTable.finalY, 'Tabla 1', paper.width,'l');

    //await this.fs.generateImagesPdf(ids, doc, margin, paper);



    curPosition = await this.fs.generateImagePdf(doc, 'bill', bodyPaper.startWithOutTitle, paper.width, 'center');
    // curPosition = await this.fs.generateImagePdf(doc, 'modal1', curPosition, paper.width/2, 'Image 2','center');
    // curPosition = await this.fs.generateImagePdf(doc, 'modal1', curPosition, paper.width, 'Image 3');
    // curPosition = await this.fs.generateImagePdf(doc, 'modal1', curPosition, paper.width/2, 'Image 4');
    // curPosition = await this.fs.generateImagePdf(doc, 'modal1', curPosition, paper.width, 'Image 5');

    //doc.movePage(2, 1);
    //this.fs.createTable(doc, '#my-table', curPosition, 'Tabla 1', paper.width);

    this.fs.headerAndFooter(doc, fileName, 'Resporte Contable Hackathon Popayan');

  }

}

