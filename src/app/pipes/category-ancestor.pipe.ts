import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryAncestor'
})
export class CategoryAncestorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (Array.isArray(value.ancestors) && value.ancestors.length) {
      const newVal = value.ancestors.map(elm => {
        return elm.name;
      });
      let displayAncestors = newVal.join(' -> ');
      if (!args) {
        displayAncestors = value.name  + ' -> ' + displayAncestors;
      }
      return displayAncestors;
    } else {
      return value.name;
    }
  }

}
