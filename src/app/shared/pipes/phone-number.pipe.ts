import { Pipe, PipeTransform } from '@angular/core';
import { format, parse } from 'libphonenumber-js';

@Pipe({
  name: 'phoneNumber',
})
export class PhoneNumberPipe implements PipeTransform {
  transform(value = ''): string {
    if (typeof value === 'string' && value !== '') {
      const initialValue = value.replace(/[^0-9+]/g, '');
      const phoneNumber = parse(initialValue, 'ID');
      return format(phoneNumber, 'E.164');
    }

    return value;
  }
}
