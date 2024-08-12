import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DashboardCollection } from '@app/collections/owner/dashboard.collection';
import { DarkModeService } from '@app/core/services/dark-mode.service';
import { MaterialColorService } from '@app/shared/services/material-color.service';
import { time } from '@lib/time';
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

@Component({
  selector: 'aka-total-sales',
  templateUrl: './total-sales.component.html',
  styleUrls: ['./total-sales.component.scss'],
})
export class TotalSalesComponent implements OnInit {
  params = { start: null, end: null };
  _date: any;

  // Initial Revenue
  sales = {
    total: 0,
    chart: [],
  };

  loading = {
    total: true,
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
  ) {}

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
        text: 'Total Sales',
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
        x: {
          show: false,
        },
        y: {
          formatter: (val, opts) => {
            return new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })
              .format(val)
              .replace(/(\.|,)00$/g, '');
          },
        },
      },
    };
  }

  setLoading(val = true) {
    this.loading = {
      total: val,
      chart: val,
    };
  }

  fetch() {
    this.setLoading(true);

    // get revenue total
    this.collection
      .total({ ...this.params, prefix: 'sales' })
      .then((data: any) => {
        this.sales.total = data.data.total;
      })
      .finally(() => {
        this.loading.total = false;
      });

    // get chart
    this.collection
      .chart({ ...this.params, prefix: 'sales' })
      .then(({ data }) => {
        this.chartOptions.series = [
          {
            name: 'Sales',
            data: data.map((val) => val.total),
            color: this.service.colors.green[500],
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
      })
      .finally(() => {
        this.loading.chart = false;
      });
  }
}
