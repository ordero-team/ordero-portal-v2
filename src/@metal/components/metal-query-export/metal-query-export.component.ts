import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MetalCollectionConfig, MetalDataList, MetalQuery } from '@lib/metal-data';
import { MetalConfirmComponent, MetalConfirmData } from '@mtl/components/metal-confirm/metal-confirm.component';
import { MetalExtendedConfig } from '@mtl/interfaces';
import { MetalExportQueue, MetalExportQueueService } from '@mtl/services/metal-export-queue.service';
import { get } from 'lodash';
import { unparse } from 'papaparse';

export type MetalExportValueGen<T> = (item: T) => string;

export interface MetalExportHeaders<T> {
  [key: string]: MetalExportValueGen<T> | string;
}

@Component({
  selector: 'ps-metal-query-export',
  templateUrl: './metal-query-export.component.html',
  styleUrls: ['./metal-query-export.component.scss'],
})
export class MetalQueryExportComponent<T> {
  @Input() title: string;
  @Input() query: MetalQuery<T>;
  @Input() headers: MetalExportHeaders<T>;

  constructor(private queue: MetalExportQueueService, private dialog: MatDialog) {}

  public confirmExport(): void {
    const { totalRecords } = this.query.meta;
    const data: MetalConfirmData = {
      title: `Export ${totalRecords.toLocaleString()} ${this.title}${totalRecords > 1 ? 's' : ''} as CSV`,
      message:
        'Export this listing with any active filters as CSV?<br/>' +
        'Depending on how much data you requested, this could take a bit.',
      confirmLabel: 'Export',
    };
    const dgRef = this.dialog.open(MetalConfirmComponent, {
      data,
    });
    dgRef.afterClosed().subscribe((result) => {
      if (result) {
        this.exportQuery();
      }
    });
  }

  public exportQuery(): void {
    const { totalRecords } = this.query.meta;
    const queue: MetalExportQueue = {
      label: `Exporting ${totalRecords.toLocaleString()} <strong>${this.title}${
        totalRecords > 1 ? 's' : ''
      }</strong> list as CSV.`,
      progress: 0,
      status: 'idle',
    };

    this.queue.add(queue);

    const browse = this.query.browse(100);
    const unsubStatus = browse.statusChange.subscribe((status) => {
      queue.status = status;

      if (status === 'complete') {
        const { totalRecords } = browse.data;
        queue.label = `${totalRecords.toLocaleString()} <strong>${this.title}${
          totalRecords > 1 ? 's' : ''
        }</strong> exported as CSV.`;
        queue.progress = 100;

        if (typeof unsubStatus === 'function') {
          unsubStatus();
        }

        if (typeof unsubState === 'function') {
          unsubState();
        }

        this.download(browse.data.records);
      }
    });
    const unsubState = browse.stateChange.subscribe(() => {
      const { totalRecords, records } = browse.data;
      queue.label = `Exporting ${records.length.toLocaleString()} of ${totalRecords.toLocaleString()} <strong>${this.title}${
        totalRecords > 1 ? 's' : ''
      }</strong> as CSV.`;
      queue.progress = Math.ceil((records.length / totalRecords) * 100);
    });

    queue.status = browse.status;
  }

  public download(records: MetalDataList<T>): void {
    const [originPath] = location.href.split('?');
    const configs = this.query.collection.configs as MetalExtendedConfig & MetalCollectionConfig<T>;
    const defaultHeaders = {
      'Item URL': (item) => `${originPath}/${item.id}`,
      ID: (item) => item.id,
    };
    const headers = { ...defaultHeaders, ...(this.headers || configs.csvHeaders || {}) } as any;
    const columns = ['#', ...Object.keys(headers)];
    const rows = [columns];

    // @TODO: Export selected items
    records.forEach((item, i) => {
      const row = [i + 1] as any;

      columns.forEach((title, j) => {
        if (j >= 1) {
          const keyFn = headers[title];
          if (typeof keyFn === 'string') {
            row.push(get(item, keyFn));
          } else if (typeof keyFn === 'function') {
            row.push(keyFn(item));
          } else {
            row.push('');
          }
        }
      });

      rows.push(row);
    });

    const text = unparse(rows);
    const name = configs.endpoint.replace(/^\//, '').replace(/\//g, '-');
    const link = document.createElement('a');
    const blob = new Blob([text], { type: 'text/plain' });
    link.download = `${name}-${new Date().toISOString()}.csv`;
    link.href = window.URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      link.remove();
    }, 300);
  }
}
