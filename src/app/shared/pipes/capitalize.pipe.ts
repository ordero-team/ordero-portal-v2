import { Pipe, PipeTransform } from '@angular/core';
import { startCase } from 'lodash';

/**
 * Startcase pipe is used to make the first letter of each word become capital.
 *
 *
 * @example
 *
 * <span>{{row.name|capitalize}}</span>
 *
 */

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {
  transform(value: any): any {
    return startCase(value);
  }
}
