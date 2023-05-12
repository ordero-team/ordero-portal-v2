import { Pipe, PipeTransform } from '@angular/core';
import { ColorService } from '@ss/color.service';
import { replace, lowerCase, startCase } from 'lodash';

/**
 * stateLabel pipe is used to transform label into specific and readable format.
 *
 *
 * @example
 *
 * {{val.label | stateLabel}}
 *
 */
@Pipe({
  name: 'stateLabel',
})
export class StateLabelPipe implements PipeTransform {
  constructor(private service: ColorService) {}

  transform(state: any): any {
    const label = this.service.labels[state] || state || '';
    return startCase(lowerCase(replace(replace(label, /-/g, ' '), /_/g, ' ')));
    // return label.replace(/-/g, ' ').replace(/_/g, ' ');
  }
}
