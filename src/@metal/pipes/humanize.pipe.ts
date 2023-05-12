import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'humanize',
})
export class HumanizePipe implements PipeTransform {
  transform(value: string, humanize?: boolean): string {
    if (humanize) {
      return value.replace(/[-_]+/, ' ');
    }

    return value;
  }
}
