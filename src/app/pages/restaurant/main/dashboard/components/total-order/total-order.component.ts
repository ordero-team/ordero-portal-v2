import { Component, Input, OnInit } from '@angular/core';
import { DashboardCollection } from '@app/collections/owner/dashboard.collection';
import { has } from 'lodash';

@Component({
  selector: 'aka-total-order',
  templateUrl: './total-order.component.html',
  styleUrls: ['./total-order.component.scss'],
})
export class TotalOrderComponent {
  _date: any;
  params = { start: null, end: null };

  @Input()
  get date() {
    return this._date;
  }

  set date(val: any) {
    if (has(val, 'start') && has(val, 'end') && this.date !== val) {
      const { start, end } = val;
      this._date = val;

      this.params = { start, end };

      this.fetch();
    }
  }

  summary = {
    total: 0,
    waiting: 0,
    completed: 0,
    cancelled: 0,
  };

  loading = {
    total: true,
    waiting: true,
    completed: true,
    cancelled: true,
  };

  constructor(private collection: DashboardCollection) {}

  ngOnInit(): void {}

  fetch() {
    this.setLoading(true);

    this.collection
      .total({ ...this.params, prefix: 'orders' })
      .then(({ data }) => {
        this.summary['total'] = data;
      })
      .finally(() => {
        this.loading.total = false;
      });

    this.collection
      .total({ ...this.params, prefix: 'orders', params: { status: 'waiting_approval' } })
      .then(({ data }) => {
        this.summary['waiting'] = data;
      })
      .finally(() => {
        this.loading.waiting = false;
      });

    this.collection
      .total({ ...this.params, prefix: 'orders', params: { status: 'completed' } })
      .then(({ data }) => {
        this.summary['completed'] = data;
      })
      .finally(() => {
        this.loading.completed = false;
      });

    this.collection
      .total({ ...this.params, prefix: 'orders', params: { status: 'cancelled' } })
      .then(({ data }) => {
        this.summary['cancelled'] = data;
      })
      .finally(() => {
        this.loading.cancelled = false;
      });
  }

  setLoading(val = true) {
    this.loading = {
      total: val,
      waiting: val,
      completed: val,
      cancelled: val,
    };
  }
}
