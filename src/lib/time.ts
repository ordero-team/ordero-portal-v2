import time from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import localeData from 'dayjs/plugin/localeData';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';
import minMax from 'dayjs/plugin/minMax';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

time.locale('en');
time.extend(relativeTime);
time.extend(isBetween);
time.extend(minMax);
time.extend(localeData);
time.extend(isSameOrAfter);
time.extend(customParseFormat);
time.extend(utc);
time.extend(timezone);
time.extend(localizedFormat);

export { time };
