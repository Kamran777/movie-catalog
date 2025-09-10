import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDecimal',
})
export class FormatDecimalPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null) return '';
    return value % 1 === 0 ? value.toFixed(1) : value.toString();
  }
}
