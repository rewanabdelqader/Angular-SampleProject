import { Injectable, Pipe, PipeTransform } from '@angular/core';
@Injectable({

  providedIn: "root"
})

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(list: any[], currency: any): any[] {
      if (!list || !currency) {
          return list;
        }    
        return list.filter(item => item.currency.id == currency);
      }
}