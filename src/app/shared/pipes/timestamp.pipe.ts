import { Pipe, PipeTransform } from '@angular/core';
import { time } from '@lib/time';
import * as _ from 'lodash';

@Pipe({
  name: 'timestamp',
})
export class TimestampPipe implements PipeTransform {
  transform(timestamp: any, format = 'DD/MM/YYYY, HH:mm', pretty = true, isUtc = false): any {
    if (timestamp && typeof timestamp === 'object') {
      timestamp = timestamp.toDateString();
    }

    if (_.isEmpty(timestamp)) {
      return '-';
    }

    const date: Date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp.toDate();
    const today = new Date();
    const res = isUtc ? time(date).utc() : time(date);

    if (pretty && date.toDateString() === today.toDateString()) {
      return res.fromNow();
    }

    return res.format(format);
  }
}
