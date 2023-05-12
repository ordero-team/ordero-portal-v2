import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe as Currency } from '@angular/common';

@Pipe({
  name: 'currency',
})
export class CurrencyPipe implements PipeTransform {
  transform(value: string | number) {
    const pipe = new Currency('en-US');
    return pipe.transform(value, 'Rp', 'symbol', '1.0-0');
  }
}
