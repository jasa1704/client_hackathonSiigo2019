import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
import {UtilitiesService} from '../services/service.index';

@Pipe({
  name: 'dataFilter'
})

export class DataFilterPipe implements PipeTransform {
  transform(items: any[], Search: string) {
    let palabras = UtilitiesService.convertirOracion(Search);
    if (items && items.length) {
      return items.filter(item => {
        for (let palabraComparar of palabras) {
          if ((palabraComparar && item.first_name.toString().toLowerCase().indexOf(palabraComparar.toLowerCase()) === -1)
            && (palabraComparar && item.last_name.toLowerCase().indexOf(palabraComparar.toLowerCase()) === -1)
            && (palabraComparar && item.identification_card.toLowerCase().indexOf(palabraComparar.toLowerCase()) === -1)
            && (palabraComparar && item.age.toLowerCase().indexOf(palabraComparar.toLowerCase()) === -1)){
            return false;
          }
        }
        return true;
      })
    } else {
      return items;
    }
  }
}
