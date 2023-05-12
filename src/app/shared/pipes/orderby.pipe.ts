import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

/**
 * OrderBy pipe is used to ordered array by configuration.
 *
 *
 * @example
 *
 * Returns array ordered by value
 * <p>{{ numbers | orderBy }}</p>  <!-- Output: [1, 2, 3] -->
 * <p>{{ numbers | orderBy: '-' }}</p>  <!-- Output: [3, 2, 1] -->
 *
 * Returns array ordered by value of deep property
 * <p>{{ deepObj | orderBy: '-deep.prop' }}</p>
 *
 * Returns array ordered by multiple properties
 * <p>{{ obj | orderBy: ['amount', 'id'] }}</p>
 *
 */

@Pipe({ name: 'orderBy' })
export class OrderByPipe implements PipeTransform {
  transform(input: any[], config?: any): any[];
  transform<T>(input: T, config?: any): T;

  transform(input: any, config?: any): any {
    if (!Array.isArray(input)) {
      return input;
    }

    const out = [...input];

    // sort by multiple properties
    if (Array.isArray(config)) {
      return out.sort((a, b) => {
        const l = config.length;
        for (let i = 0; i < l; ++i) {
          const [prop, asc] = this.extractFromConfig(config[i]);
          const pos = this.orderCompare(prop, asc, a, b);
          if (pos !== 0) {
            return pos;
          }
        }

        return 0;
      });
    }

    // sort by a single property value
    if (_.isString(config)) {
      const [prop, asc, sign] = this.extractFromConfig(config);

      if (config.length === 1) {
        // tslint:disable-next-line:switch-default
        switch (sign) {
          case '+':
            return out.sort(this.simpleSort.bind(this));
          case '-':
            return out.sort(this.simpleSort.bind(this)).reverse();
        }
      }

      return out.sort(this.orderCompare.bind(this, prop, asc));
    }

    // default sort by value
    return out.sort(this.simpleSort.bind(this));
  }

  simpleSort(a: any, b: any) {
    return _.isString(a) && _.isString(b) ? a.toLowerCase().localeCompare(b.toLowerCase()) : a - b;
  }

  extractDeepPropertyByMapKey(obj: any, map: string): any {
    const keys = map.split('.');
    const head = keys.shift();

    return keys.reduce((prop: any, key: string) => {
      return !_.isUndefined(prop) && !_.isUndefined(prop[key]) ? prop[key] : undefined;
    }, obj[head || '']);
  }

  orderCompare(prop: string, asc: boolean, a: any, b: any) {
    const first = this.extractDeepPropertyByMapKey(a, prop);
    const second = this.extractDeepPropertyByMapKey(b, prop);

    if (first === second) {
      return 0;
    }

    if (_.isUndefined(first) || first === '') {
      return 1;
    }

    if (_.isUndefined(second) || second === '') {
      return -1;
    }

    if (_.isString(first) && _.isString(second)) {
      const pos = first.toLowerCase().localeCompare(second.toLowerCase());

      return asc ? pos : -pos;
    }

    return asc ? first - second : second - first;
  }

  extractFromConfig(config: any) {
    const sign = config.substr(0, 1);
    const prop = config.replace(/^[-+]/, '');
    const asc = sign !== '-';

    return [prop, asc, sign];
  }
}
