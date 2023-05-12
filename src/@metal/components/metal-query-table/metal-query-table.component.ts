import {
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  HostBinding,
  Input,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { DarkModeService } from '@app/core/services/dark-mode.service';
import { MetalQuery, MetalRecord } from '@lib/metal-data';
import { MetalQueryBulkAction, MetalQueryRow, MetalQueryRowAction } from '@mtl/components/metal-query/metal-query.component';

@Directive({
  selector: '[psQHead]',
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class QHeadDirective<T> {}

@Directive({
  selector: '[psQCol]',
})
export class QColDirective {
  @HostBinding('class') className = 'ps-table-cell';

  @Input()
  get class() {
    return this.className;
  }

  set class(value: string) {
    this.className = `ps-table-cell ${value}`;
  }
}

@Directive({
  selector: '[psQBody]',
})
export class QBodyDirective<T> {
  @Input() psQBodyAs: T;

  constructor(private _template: TemplateRef<QCellContext<T>>) {}
}

export interface QCellContext<T> {
  $implicit: T;
  record: MetalRecord<T>;
  index: number;
}

@Directive({
  selector: '[psQCell]',
})
export class QCellDirective<T> {
  @Input() psQCell: string;
  @Input() sortBy: string;
  @Input() class: string;

  @ContentChild(QHeadDirective, { read: TemplateRef, static: true }) head: TemplateRef<QCellContext<T>>;
  @ContentChild(QBodyDirective, { read: TemplateRef, static: true }) body: TemplateRef<QCellContext<T>>;
}

@Component({
  selector: 'ps-metal-query-table',
  templateUrl: './metal-query-table.component.html',
  styleUrls: ['./metal-query-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MetalQueryTableComponent<T> {
  @Input() query: MetalQuery<T>;
  @Input() rows: MetalQueryRow<T>[] = [];
  @Input() selectedRecords: MetalRecord<T>[] = [];
  @Input() class: string;

  @Input() cellRefs: QueryList<QCellDirective<T>>;
  @Input() displayedBulkActions: MetalQueryBulkAction<T>[];

  @ContentChildren(QCellDirective) columnRefs: QueryList<QCellDirective<T>>;

  public activeRow: MetalQueryRow<T>;
  public dummies: number[] = [];
  public displayedRowActions: MetalQueryRowAction<T>[] = [];

  public get menuClass() {
    return document.body.className.includes('dark') ? 'dark-mode' : 'light-mode';
  }

  public get allRowsSelected(): boolean {
    return this.rows.length && this.rows.length === this.selectedRecords.length;
  }

  public get fewRowsSelected(): boolean {
    return this.rows.length && this.selectedRecords.length >= 1 && this.selectedRecords.length < this.rows.length;
  }

  constructor(public darkMode: DarkModeService) {
    for (let i = 0; i < 25; ++i) {
      this.dummies.push(i);
    }
  }

  public trackRow(index: number) {
    return index;
  }

  public triggerRowAction(action: MetalQueryRowAction<T>, event: MouseEvent) {
    const { action: handler } = action;
    if (this.activeRow && typeof handler === 'function') {
      const { record } = this.activeRow;
      handler(record.data, event, record)();
    }
  }
}
