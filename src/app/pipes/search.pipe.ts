import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], Search: string, object:any): any {

    const words = this.splitText(Search);
    let numErrors = 0;

    // let object = {
    //   numero_contrato: null,
    //   objeto_contrato: null,
    //   valor_contrato: null,
    //   plazo_ejecucion: null,
    //   documento_tercero: null,
    //   razon_social_tercero: null,
    //   modalidad: null,
    //   procedimiento_causal: null,
    //   fecha_creacion: null,
    //   fecha_inicio: null,
    // }

    if (items && items.length) {
      return items.filter(item => {
        for (const palabraComparar of words) {
          numErrors = 0;
          for( let att in object){
            let atributo = att.toString();
            if (item[atributo]) {
              if(item[atributo].toString().toLowerCase().indexOf(palabraComparar.toLowerCase()) === -1) {
                numErrors += 1;
              }
              atributo
            } else {
              numErrors += 1;
            }
          }
          if( Object.keys(object).length === numErrors) return false;
        }
        
        return true;
      })
    } else {
      return items;
    }

  
  }

  splitText(search: string) {
    let existeEspacioAlFinal: boolean = false;
    let index: any;
    let palabra: any;
    let palabras: any = [];
    while (search.indexOf(' ') !== -1) {
      index = search.indexOf(' ');
      console.log('index', index)
      console.log('search',search)
      palabra = search.substring(0, index);
      console.log('palabra', palabra)
      palabras.push(palabra);
      if (index + 1 === search.length) {
        existeEspacioAlFinal = true;
        break;
      } else {
        debugger
        search = search.substring(index + 1, search.length);
      }
    }
    if (!existeEspacioAlFinal) palabras[palabras.length] = search;
    return palabras;
  };

}
