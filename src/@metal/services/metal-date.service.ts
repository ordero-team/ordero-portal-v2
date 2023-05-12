import { Injectable } from '@angular/core';
import { time } from '@lib/time';
import { Dayjs, OpUnitType } from 'dayjs';

export interface MetalDateRange {
  start: Dayjs;
  end: Dayjs;
}

export interface MetalDateRangeFilter {
  start?: string;
  end?: string;
  shortcut?: string;
  zone?: string;
}

@Injectable({
  providedIn: 'root',
})
export class MetalDateService {
  public zone = time.tz.guess();
  public filterFormat = 'MMM DD, YYYY';
  public filterSeparator = '|';
  public filterRegExp = /\{[\d\w\s:,-\/|]+\}$/;

  public startOf(date: Date, unit: OpUnitType, zone?: string): Dayjs {
    return time.tz(date, zone || this.zone).startOf(unit);
  }

  public endOf(date: Date, unit: OpUnitType, zone?: string): Dayjs {
    return time.tz(date, zone || this.zone).endOf(unit);
  }

  public prev(amount: number, unit: OpUnitType, zone?: string): Dayjs {
    return time.tz(zone || this.zone).subtract(amount, unit);
  }

  public next(amount: number, unit: OpUnitType, zone?: string): Dayjs {
    return time.tz(zone || this.zone).add(amount, unit);
  }

  public subtract(date: Date, amount: number, unit: OpUnitType, zone?: string): Dayjs {
    return time.tz(date, zone || this.zone).subtract(amount, unit);
  }

  public toFilterLabel(date: Date, zone?: string): string {
    return time.tz(date, zone || this.zone).format(this.filterFormat);
  }

  public toFilter(start: Date, end: Date, zone?: string): string;
  public toFilter(shortcut: string, zone: string): string;
  public toFilter(start: string | Date, endZone?: string | Date, zone?: string): string {
    const ranges = [];

    if (start instanceof Date) {
      ranges.push(this.toFilterLabel(start));
    } else if (typeof start === 'string') {
      ranges.push(start);
    }

    if (endZone instanceof Date) {
      ranges.push(this.toFilterLabel(endZone));
    } else if (typeof endZone === 'string') {
      ranges.push(endZone);
    }

    if (typeof zone === 'string') {
      ranges.push(zone);
    }

    return `\{${ranges.join(this.filterSeparator)}\}`;
  }

  public isFilter(range: string): boolean {
    return this.filterRegExp.test(range);
  }

  public findFilter(text: string) {
    return text.match(this.filterRegExp);
  }

  public fromFilterLabel(range: string): MetalDateRangeFilter {
    const [start, end, zone] = range.replace(/^\{/, '').replace(/\}$/, '').split(this.filterSeparator);

    if (/[,-\/]+/.test(start)) {
      return { start, end, zone };
    } else {
      return { shortcut: start, zone: end };
    }
  }

  public fromFilter(range: string): MetalDateRange {
    const { start, end, shortcut, zone } = this.fromFilterLabel(range);

    if (start && end) {
      return {
        start: this.startOf(new Date(start), 'day', zone),
        end: this.endOf(new Date(end), 'day', zone),
      };
    } else {
      return this.rangeOf(shortcut, zone);
    }
  }

  public rangeOf(shortcut: string, zone?: string): MetalDateRange {
    const start = time.tz(zone || this.zone);
    const end = time.tz(zone || this.zone);

    switch (shortcut.toLowerCase()) {
      case 'today':
        return {
          start: start.startOf('day'),
          end: end.endOf('day'),
        };
      case 'yesterday':
        return {
          start: start.subtract(1, 'day').startOf('day'),
          end: end.subtract(1, 'day').endOf('day'),
        };
      case 'last 7 days':
        return {
          start: start.subtract(7, 'day').startOf('day'),
          end: end.endOf('day'),
        };
      case 'last 30 days':
        return {
          start: start.subtract(30, 'day').startOf('day'),
          end: end.endOf('day'),
        };
      case 'this month':
        return {
          start: start.startOf('month').startOf('day'),
          end: end.endOf('month').endOf('day'),
        };
      case 'last month':
        return {
          start: start.startOf('month').subtract(1, 'month').startOf('day'),
          end: end.startOf('month').subtract(1, 'month').endOf('day'),
        };
      case 'this year':
        return {
          start: start.startOf('year').startOf('day'),
          end: end.endOf('year').endOf('day'),
        };
      case 'last year':
        return {
          start: start.startOf('year').subtract(1, 'year').startOf('day'),
          end: end.endOf('year').subtract(1, 'year').endOf('day'),
        };
      default:
        return {
          start: start.startOf('day'),
          end: end.endOf('day'),
        };
    }
  }
}
