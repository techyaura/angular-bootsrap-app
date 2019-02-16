import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getMonthName'
})
export class GetMonthNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const monthsArray = [
      'JANUARY',
      'FEBUARY',
      'MARCH',
      'APRIL',
      'MAY',
      'JUNE',
      'JULY',
      'AUGUST',
      'SEPTEMBER',
      'OCTOBER',
      'NOVEMBER',
      'DECEMBER'
    ];
    if (value) {
      return monthsArray[value - 1];
    }
    return null;
  }
}
