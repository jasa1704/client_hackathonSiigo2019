import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import Config from '../../config/config';
import * as jsPDF from 'jspdf';

//Servicios
import { PagerService } from '../../services/shared/pager.service'
import { FilesService } from '../../services/service.index';

declare function init_plugins();

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  // patient = new Patient();
  // patients1: Patient[] = [];

  constructor(
    private router: Router,
    private fs: FilesService,
    private http: Http,
    private pagerService: PagerService) {
    init_plugins();
  }

  private allItems: any[];
  public pager: any = {};
  public pagedItems = [];
  public Search: any = '';

  ngOnInit() {
    // this.cargarPacientes();
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  dashboardPaciente(item) {
    localStorage.setItem('patient', JSON.stringify(item));
    this.router.navigateByUrl('/patient/clinicHistory');
  }

  // crearPaciente() {
  //   this.patientService.crearPatient(this.patient, res => {
  //     if (res.ok === true) {
  //       this.router.navigate(['/main']);
  //     }
  //   });
  // }

  // cargarPacientes() {
  //   this.patientService.cargarPatients(patients2 => {
  //     this.patients1 = patients2;
  //     this.allItems = patients2;
  //     this.setPage(1);
  //   }
  //   );
  // }

  // restablcerCrearPaciente() {
  //   this.patient = new Patient();
  // }

  // /////////////////////////// PDF ///////////////////////////////
  async downloadReport(ids) {

    let doc = new jsPDF('p', 'mm', 'letter');
    const fileName = 'Reportes' + '.pdf';

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

    let body = [
      ['A 11', 'A21'],
      ['A 12', 'A22'],
      ['A 13', 'A23'],
    ];

    this.fs.createTable(doc, body, bodyPaper.startWithTitle, null, paper.width / 2);
    this.fs.createTable(doc, '#my-table', doc.lastAutoTable.finalY, 'Tabla 1', paper.width,'l');

    //await this.fs.generateImagesPdf(ids, doc, margin, paper);



    curPosition = await this.fs.generateImagePdf(doc, 'my-table', doc.lastAutoTable.finalY, paper.width/2, 'Image 1','center');
    // curPosition = await this.fs.generateImagePdf(doc, 'modal1', curPosition, paper.width/2, 'Image 2','center');
    // curPosition = await this.fs.generateImagePdf(doc, 'modal1', curPosition, paper.width, 'Image 3');
    // curPosition = await this.fs.generateImagePdf(doc, 'modal1', curPosition, paper.width/2, 'Image 4');
    // curPosition = await this.fs.generateImagePdf(doc, 'modal1', curPosition, paper.width, 'Image 5');

    //doc.movePage(2, 1);
    //this.fs.createTable(doc, '#my-table', curPosition, 'Tabla 1', paper.width);

    this.fs.headerAndFooter(doc, fileName, 'Resporte Contable Test 1');

  }

}
