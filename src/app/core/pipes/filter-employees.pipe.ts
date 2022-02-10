import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from "../models/employee.model";

@Pipe({
  name: 'filterEmployees'
})
export class FilterEmployeesPipe implements PipeTransform {

  transform(items: Employee[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => item.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }

}
