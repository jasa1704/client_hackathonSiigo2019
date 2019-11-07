import { Injectable } from '@angular/core';
import Config from '../../config/config';
import * as html2canvas from 'html2canvas'
import 'jspdf-autotable';

@Injectable()
export class FilesService {

  public imgData: any;


  constructor(
  ) {
    this.ImgToBase64();
   }

   async generateImagePdf(doc, idImage, startY, imgWidth, title = null, position = null) {

    let pageWidth = doc.internal.pageSize.getWidth();
    let pageHigh = doc.internal.pageSize.getHeight();

    let _startY = startY + 8;

    let margin = Config.marginPaper;

    margin.right = pageWidth - Config.base;
    margin.down = pageHigh - Config.base;
    let bodyPaper = Config.bodyPaper;

    let paper = {
      width: margin.right - margin.left,
      high: margin.down - margin.up,
    }

    let idReferenceHTML = document.getElementById(idImage);

    let x = margin.left;
    let posTitleX = margin.left;

    if (position === 'center')
    {
      x = pageWidth / 2 - imgWidth / 2;
      posTitleX = this.calcularCentroPDF(doc, pageWidth, title);
    }

    const canvas = await html2canvas(idReferenceHTML)
    const imgHeight = canvas.height * imgWidth / canvas.width; // pageHeight;
    const imgData = canvas.toDataURL('image/png');


    if (_startY + imgHeight + 15 >= margin.down) {
      _startY = margin.up;
      doc.addPage();
    }
    if (title) {
      let body = [
        [title],
      ];

      doc.autoTable({
        body,
        startY: _startY,
        margin: { top: margin.up, left: posTitleX, right: margin.right, button: margin.down },
        theme: 'plain',
        tableWidth: pageWidth / 2,
        styles: { cellPadding: 0.5, cellWidth: 'auto', font: 'arial', fontSize: 12, halign: 'left', fontStyle: 'bold' },
      });

      _startY = doc.lastAutoTable.finalY + 2;
    }

    doc.addImage(imgData, 'PNG', x, _startY, imgWidth, imgHeight, null, 'NONE');

    return _startY + imgHeight;

  }

  toBase64(img) {
    return new Promise((resolve, reject) => {

      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };

      xhr.open('GET', img);
      xhr.responseType = 'blob';
      xhr.send();
    })
  }


  async ImgToBase64() {
    let urlImg = '../../../assets/images/siigo.png';
    this.imgData = await this.toBase64(urlImg);
  }


  headerAndFooter(doc, fileName, title) {

    doc.setPage(1)
    let pageWidth = doc.internal.pageSize.getWidth();
    let pageHigh = doc.internal.pageSize.getHeight();
    let bodyPaper = Config.bodyPaper;
    doc.setFontSize(13);
    doc.setFont('currier', 'normal');

    var offsetTitle = this.calcularCentroPDF(doc, pageWidth, title);
    doc.text(offsetTitle, bodyPaper.title, title);

    let pageNum = doc.internal.getNumberOfPages();


    for (let i = 1; i <= pageNum; i++) {
      doc.setPage(i)
      let pageWidth = doc.internal.pageSize.getWidth();
      let pageHigh = doc.internal.pageSize.getHeight();

      let logoSize = Config.logoSize;
      let margin = Config.marginPaper;

      margin.right = pageWidth - Config.base;
      margin.down = pageHigh - Config.base;

      let lineHeader = Config.base + 4;
      let lineFooter = margin.down;

      //Linea Superior
      doc.line(margin.left, lineHeader, margin.right, lineHeader, 'F');
      doc.line(margin.left, lineHeader + 0.1, margin.right, lineHeader + 0.2, 'F');
      doc.line(margin.left, lineHeader + 0.2, margin.right, lineHeader + 0.2, 'F');

      doc.setFont('currier', 'normal');
      doc.setFontSize(10);

      //Encabezado
      doc.addImage(this.imgData, 'png', margin.left / 1.5, 2, logoSize.x, logoSize.y);

      doc.setFontSize(15);
      doc.setFont('currier', 'bold');

      doc.setFont('currier', 'normal');
      doc.setFontSize(10);

      doc.text(logoSize.x + margin.left, 10, 'Siigo');
      doc.text(logoSize.x + margin.left, 15, 'NIT: ' + '830.048.145 - 8');
      doc.text(logoSize.x + margin.left, 20, 'Mas que un software contable');

      doc.text(margin.right, 10, 'Software Constable Siigo', 'right');
      doc.text(margin.right, 15, 'Contabilidad', 'right');
      doc.setFont('currier', 'bold');
      doc.text(margin.right, 20, `Pagina ${i} de ${pageNum}`, 'right');
      doc.setFont('currier', 'normal');

      // Pie de pagina
      doc.line(margin.left, lineFooter, margin.right, lineFooter);
      doc.line(margin.left, lineFooter + 0.1, margin.right, lineFooter + 0.1);
      doc.line(margin.left, lineFooter + 0.2, margin.right, lineFooter + 0.2);
      doc.line(margin.left, lineFooter + 0.3, margin.right, lineFooter + 0.2);

      doc.setFontSize(9);
      let xOffsetWww = this.calcularCentroPDF(doc, pageWidth, 'www.siigo.com');
      let xOffsetTel = this.calcularCentroPDF(doc, pageWidth, '6338360');
      let xOffsetDir = this.calcularCentroPDF(doc, pageWidth, 'Popayán Cauca');

      doc.text(xOffsetWww, margin.down + 5, 'www.siigo.com');
      doc.text(xOffsetTel, margin.down + 10, '6338360');
      doc.text(xOffsetDir, margin.down + 15, 'Popayán Cauca');
    }

    doc.save(fileName);

  }




  calcularCentroPDF(_doc, _size, _string) {

    let xOffsetDir = 0;
    let ppp = 72;
    let inchTomm = 25.4;
    let lengthString = _doc.getStringUnitWidth(_string) * _doc.internal.getFontSize();
    xOffsetDir = (_size / 2) - (lengthString * (inchTomm / ppp) / 2);
    return xOffsetDir;
  }

  createTable(doc, data, startY, title = null, tableWidth = null, orientation = null, paperSize = null) {

    //#region  variables
    let pageWidth = doc.internal.pageSize.getWidth();
    let margin = Config.marginPaper;
    let params = new AutoTableParams();
    let _startY = startY;
    //#endregion

    //#region  setUp variables
    margin.right = pageWidth - Config.base;
    margin.down = Config.base;
    params.margin = { top: margin.up, left: margin.left, right: margin.left, bottom: margin.down };

    if (!paperSize) paperSize = 'letter';

    if (typeof data === 'string') {
      params.html = data;
      params.useCss = true;
    } else {
      params.body = data;
      params.theme = 'plain';
      params.tableWidth = tableWidth;
      params.styles = { cellPadding: 0.5, cellWidth: 'auto', font: 'arial', fontSize: 11, halign: 'left' };
    }
    //#endregion

    //#region  Logic
    if (title) {
      let body = [
        [title],
      ];
      if (orientation) {
        if (orientation === 'l') {
          doc.addPage(paperSize, 'l');
        } else {
          doc.addPage(paperSize, 'p');
        }
        doc.autoTable({
          body,
          startY: margin.up,
          margin: { top: margin.up, left: margin.left, right: margin.right, bottom: margin.down },
          theme: 'plain',
          tableWidth: pageWidth / 2,
          styles: { cellPadding: 0.5, cellWidth: 'auto', font: 'arial', fontSize: 12, halign: 'left', fontStyle: 'bold' },
        });
      } else {
        doc.autoTable({
          body,
          startY: _startY + 8,
          margin: { top: margin.up, left: margin.left, right: margin.right, bottom: margin.down },
          theme: 'plain',
          tableWidth: pageWidth / 2,
          styles: { cellPadding: 0.5, cellWidth: 'auto', font: 'arial', fontSize: 12, halign: 'left', fontStyle: 'bold' },
        });
      }
      _startY = doc.autoTable.previous.finalY - 15;
    }

    params.startY = title ? _startY + 15 : _startY + 8;
    doc.autoTable(params);
    //#endregion
  }

}


class AutoTableParams {
  startY?: number;
  body?: any;
  html?: any;
  margin?: any;
  theme?: any;
  tableWidth?: any;
  useCss?: boolean;
  styles?: any;
}