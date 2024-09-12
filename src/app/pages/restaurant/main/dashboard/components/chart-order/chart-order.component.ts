import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DashboardCollection } from '@app/collections/owner/dashboard.collection';
import { DarkModeService } from '@app/core/services/dark-mode.service';
import { MaterialColorService } from '@app/shared/services/material-color.service';
import { time } from '@lib/time';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { has } from 'lodash';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexTooltip,
  ApexLegend,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  legend: ApexLegend;
};

@UntilDestroy()
@Component({
  selector: 'aka-chart-order',
  templateUrl: './chart-order.component.html',
  styleUrls: ['./chart-order.component.scss'],
})
export class ChartOrderComponent implements OnInit {
  params = { start: null, end: null };
  _date: any;

  // Initial Revenue
  orders = {
    chart: [],
  };

  loading = {
    chart: true,
  };

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input()
  get date() {
    return this._date;
  }

  set date(val: any) {
    if (has(val, 'start') && has(val, 'end') && this._date !== val) {
      const { start, end } = val;
      this._date = val;
      this.params = { start, end };
      this.fetch();
    }
  }

  constructor(
    private collection: DashboardCollection,
    private service: MaterialColorService,
    public darkMode: DarkModeService
  ) {
    darkMode.darkMode$.pipe(untilDestroyed(this)).subscribe((val) => {
      // this.chartOptions.tooltip.theme = val ? 'dark' : 'light';
    });
  }

  ngOnInit(): void {
    this.chartOptions = {
      series: [],
      chart: {
        height: 350,
        width: '100%',
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Total Orders',
        align: 'left',
      },
      legend: {
        tooltipHoverFormatter: function (val, opts) {
          return val + ' - <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>';
        },
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [],
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
      },
    };
  }

  setLoading(val = true) {
    this.loading = {
      chart: val,
    };
  }

  fetch() {
    this.setLoading(true);

    // get chart
    this.collection
      .chart({ ...this.params, prefix: 'orders', params: { status: 'completed' } })
      .then(({ data }) => {
        this.chartOptions.series = [
          {
            name: 'Completed Orders',
            data: data.map((val) => val.total),
          },
        ];

        this.chartOptions.xaxis.categories = data.map((val) => {
          if (val.labelType === 'daily') {
            val.label = time(val.label).format('DD MMM');
          } else {
            val.label = time(val.label).format('HH');
          }

          return val.label;
        });

        this.collection.chart({ ...this.params, prefix: 'orders', params: { status: 'cancelled' } }).then(({ data }) => {
          this.chartOptions.series = [
            ...this.chartOptions.series,
            {
              name: 'Cancelled Orders',
              data: data.map((val) => val.total),
              color: this.service.colors.red[500],
            },
          ];
        });
      })
      .finally(() => {
        this.loading.chart = false;
      });
  }
}
