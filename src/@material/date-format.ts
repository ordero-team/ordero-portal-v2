import { Platform } from '@angular/cdk/platform';
import { NativeDateAdapter } from '@angular/material/core';
import time from 'dayjs';

export const AppDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export class AppDateAdapter extends NativeDateAdapter {
  constructor(matDateLocale: string, platform: Platform) {
    super(matDateLocale, platform);
  }

  parse(value: any): Date | null {
    return time(value, 'DD/MM/YYYY').toDate();
  }

  format(date: Date, displayFormat: any): string {
    return time(date).format(displayFormat);
  }
}
