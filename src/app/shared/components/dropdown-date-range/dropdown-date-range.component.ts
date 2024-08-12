import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { time } from '@lib/time';
import * as _ from 'lodash';
import { find } from 'lodash';

type IQuick = Array<any>;

@Component({
  selector: 'aka-dropdown-date-range',
  templateUrl: './dropdown-date-range.component.html',
  styleUrls: ['./dropdown-date-range.component.scss'],
})
export class DropdownDateRangeComponent implements OnInit {
  public focused = false;
  public showModal = false;
  public quickRanges: IQuick = [
    {
      slug: 'today',
      label: 'Today',
      start: time().startOf('day'),
      end: time().startOf('day'),
    },
    {
      slug: 'last-7-days',
      label: 'Last 7 Days',
      start: time().subtract(7, 'day').startOf('day'),
      end: time().endOf('day'),
    },
    {
      slug: 'this-week',
      label: 'This Week',
      start: time().startOf('week'),
      end: time().endOf('week'),
    },
    {
      slug: 'last-30-days',
      label: 'Last 30 Days',
      start: time().subtract(30, 'day').startOf('day'),
      end: time().endOf('day'),
    },
    {
      slug: 'this-month',
      label: 'This Month',
      start: time().startOf('month'),
      end: time().endOf('month'),
    },
    {
      slug: 'last-month',
      label: 'Last Month',
      start: time().subtract(1, 'month').startOf('month'),
      end: time().subtract(1, 'month').endOf('month'),
    },
  ];
  public queryDate;

  public quickDate = null;
  public startDate;
  public endDate;
  public dateLabel;

  showStartDate;
  showEndDate;

  @Output() callback = new EventEmitter<any>();
  @Input() default = 'last-7-days';
  @Input() setQueryParam = true;

  constructor(private current: ActivatedRoute, private router: Router) {}

  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });

  ngOnInit() {
    this.current.queryParams.subscribe((params) => {
      this.range = new FormGroup({
        start: new FormControl(new Date(params.start)),
        end: new FormControl(new Date(params.end)),
      });

      this.endDate = new Date();

      if (!_.isEmpty(params)) {
        this.importParams(params);
        const start = params.start;
        const end = params.end;

        const setQuickDate = find(this.quickRanges, (val) => {
          const startDate = val.start.format('YYYY-MM-DD');
          const endDate = val.end.format('YYYY-MM-DD');

          if (start === startDate && end === endDate) {
            return val;
          } else {
            return null;
          }
        });

        this.quickDate = setQuickDate ? setQuickDate.slug : '';
      } else {
        this.generateDateRange(this.default);
      }
    });
  }

  setDateRange() {
    // Reset the quick range
    this.quickDate = '';
    const date = {
      start: this.dateFormat(this.range.value.start),
      end: this.range.value.end === null ? this.dateFormat(this.range.value.start) : this.dateFormat(this.range.value.end),
    };
    const val = Object.values(date).join(',');

    this.generateDateRange(val);
  }

  setQuickRange(range: { start: string; end: string; slug: string }) {
    // Reset the custom range
    this.startDate = this.endDate = null;
    this.generateDateRange(range.slug);
  }

  importParams(params: { [key: string]: string | string[] }) {
    let start, end;
    for (const [key, value] of Object.entries(params)) {
      if (['start', 'end', 'date'].includes(key) && typeof value === 'string') {
        if (key === 'start') {
          start = value;
        } else if (key === 'end') {
          end = value;
        }
      }
    }

    if (start && end) {
      this.generateDateRange(`${start},${end}`);
    }
  }

  generateDateRange(value: string) {
    const date = value.split(',');
    let params;

    this.queryDate = value;

    if (date.length > 1) {
      params = {
        start: this.dateFormat(date[0]),
        end: this.dateFormat(date[1]),
      };
    } else {
      // Quick Range
      this.quickDate = date[0];
      params = date[0];
    }

    // Generate the daterange information
    if (typeof params === 'string') {
      // Find the quick range
      const quick = _.find(this.quickRanges, ['slug', params]);

      if (quick) {
        // Check if End Date available
        let endDate = quick.end;

        if (_.isUndefined(endDate)) {
          endDate = time().endOf('day');
        }

        // Send Callback
        const start = this.dateFormat(quick.start);
        const end = this.dateFormat(endDate);
        this.callback.emit({
          start,
          end,
          slug: quick.slug,
        });

        if (this.setQueryParam) {
          this.setQueryParams(start, end);
        }
      } else {
      }
    } else if (_.isObject(params)) {
      // Label For Custom Range
      const { start, end } = params as any;
      this.dateLabel = this.dateFormat(start, 'DD/MM/YYYY') + ' - ' + this.dateFormat(end, 'DD/MM/YYYY');

      if (this.setQueryParam) {
        this.setQueryParams(start, end);
      }

      // Send Callback
      this.callback.emit({ start, end, slug: `${start},${end}` });
    } else if (Array.isArray(params)) {
      const start = params[0];
      const end = params[1];
      this.dateLabel = this.dateFormat(start, 'DD/MM/YYYY') + ' - ' + this.dateFormat(end, 'DD/MM/YYYY');

      if (this.setQueryParam) {
        this.setQueryParams(start, end);
      }

      // Send Callback
      this.callback.emit({ start, end, slug: params.join(',') });
    }
  }

  dateFormat(date: string, format = 'YYYY-MM-DD') {
    return time(date).format(format);
  }

  setQueryParams(start: string, end: string) {
    const queryParams: Params = {
      start,
      end,
    };

    this.router.navigate([], {
      relativeTo: this.current,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
