import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ancestors'
})
export class AncestorsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (Array.isArray(value.ancestors) && value.ancestors.length) {
      const newVal = value.ancestors.map(elm => {
        return elm.name;
      });
      let displayAncestors = newVal.join(' -> ');
      if (!args) {
        displayAncestors = displayAncestors + ' -> ' + value.name;
      }
      return displayAncestors;
    } else {
      return value.name;
    }
  }

}
