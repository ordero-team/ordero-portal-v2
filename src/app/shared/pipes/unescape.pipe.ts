import { Pipe, PipeTransform } from '@angular/core';

/**
 * unescape pipe
 *
 *
 * @example
 *
 * <span>{{row.name|unescape}}</span>
 *
 */

@Pipe({ name: 'unescape' })
export class UnescapePipe implements PipeTransform {
  transform(value: any): any {
    return unescape(value);
  }
}
