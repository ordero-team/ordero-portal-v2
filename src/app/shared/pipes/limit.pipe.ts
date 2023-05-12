import { Pipe, PipeTransform } from '@angular/core';

/**
 * Limit pipe is used to limit the number of rows displayed in the loop statement.
 *
 *
 * @example
 *
 * *ngFor="let row of rows|limit:8"
 *
 */
@Pipe({
  name: 'limit',
})
export class LimitPipe implements PipeTransform {
  transform(value: any[], limit?: number): any {
    if (typeof value === 'undefined') {
      return value;
    }

    if (!limit || value.length <= limit) {
      return value;
    }

    let i = 0;
    const limited: any[] = [];

    while (i < limit) {
      limited.push(value[i]);
      i += 1;
    }

    return limited;
  }
}
