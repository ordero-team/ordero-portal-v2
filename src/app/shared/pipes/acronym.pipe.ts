import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'acronym',
})
export class AcronymPipe implements PipeTransform {
  transform(value: string, length = 2): string {
    if (typeof value === 'string') {
      return (value || '')
        .split(/\s/)
        .reduce((acc, word) => acc + word.replace(/[^0-9a-z]/gi, '').charAt(0), '')
        .substring(0, length);
    }
    return ' ';
  }
}
