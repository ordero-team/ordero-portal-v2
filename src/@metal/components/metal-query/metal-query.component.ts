import { Component, ContentChildren, ElementRef, Input, OnDestroy, OnInit, QueryList } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { decodeFiltersFromObject, MetalDataMeta, MetalFilterState, MetalQuery, MetalRecord } from '@lib/metal-data';
import { Unsubscribe } from '@lib/metal-data/event';
import { MetalExportHeaders } from '@mtl/components/metal-query-export/metal-query-export.component';
import { QCellDirective } from '@mtl/components/metal-query-table/metal-query-table.component';
import { MetalExtendedMeta } from '@mtl/interfaces';
import * as _ from 'lodash';

type RecordsCheckHandler<T> = (selectedRecords: MetalRecord<T>[]) => boolean;

export interface MetalQueryBulkAction<T> {
  text: string;
  action: (event: MouseEvent, selectedRecords: MetalRecord<T>[]) => void;
  icon?: string;
  color?: string | ThemePalette;
  children?: MetalQueryBulkAction<T>[];

  hidden?: RecordsCheckHandler<T> | boolean;
  disabled?: RecordsCheckHandler<T> | boolean;
}

type MetalRecordCheckHandler<T> = (record: MetalRecord<T>) => boolean;
type MetalRowActionHandler<T> = (data: T, event: MouseEvent, record: MetalRecord<T>) => () => void | Promise<void>;
type MetalValueByRecord<T, R> = (record: MetalRecord<T>) => R;

export interface MetalQueryRowAction<T> {
  text: string;
  action?: MetalRowActionHandler<T>;
  link?: MetalValueByRecord<T, string[]> | string[];
  icon?: string;
  color?: string | ThemePalette;
  children?: MetalQueryRowAction<T>[];

  hidden?: MetalRecordCheckHandler<T> | boolean;
  disabled?: MetalRecordCheckHandler<T> | boolean;
}

export interface MetalQuerySelectedInfo {
  selected?: string | number;
  total?: string | number;
  indexed?: string | number;
}

export interface MetalQueryRow<T> {
  record?: MetalRecord<T>;
  actions?: MetalQueryRowAction<T>[];
}

@Component({
  selector: 'ps-metal-query',
  templateUrl: './metal-query.component.html',
  styleUrls: ['./metal-query.component.scss'],
  exportAs: 'psMetalQuery',
})
export class MetalQueryComponent<T> implements OnInit, OnDestroy {
  @Input() query: MetalQuery<T>;

  @Input() title: string;
  @Input() bulkActions: MetalQueryBulkAction<T>[] = [];
  @Input() rowActions: MetalQueryRowAction<T>[] = [];
  @Input() exportHeaders: MetalExportHeaders<T>;

  @Input() resolve?: () => any;
  @Input() autoResolve = true;

  @ContentChildren(QCellDirective) cellRefs: QueryList<QCellDirective<T>>;

  public status: 'init' | 'ready' = 'init';
  public selectedRecords: MetalRecord<T>[] = [];
  public selectedInfo: MetalQuerySelectedInfo = {};

  public displayedBulkActions: MetalQueryBulkAction<T>[] = [];
  public displayedRows: MetalQueryRow<T>[] = [];
  public menuClass: string;

  public get filterBarStyle() {
    const actionWrap = this.elem.nativeElement.querySelector('.query-bulk-actions');

    if (actionWrap && actionWrap.offsetWidth) {
      return {
        transform: `translate3d(${actionWrap.offsetWidth + 26}px,0,0)`,
        borderLeft: '1px solid #eee',
        boxShadow: '0 0 9px rgba(0,0,0,0.1)',
        pointerEvents: 'none',
        opacity: '0.5',
      };
    } else {
      return {};
    }
  }

  private _unsubscribeQueryEvent: Unsubscribe;
  private _unsubscribeRecordChange: Unsubscribe;
  private _unsubscribeSelectionChange: Unsubscribe;
  private _readyHandled: boolean;

  constructor(public elem: ElementRef, private router: Router, private activeRoute: ActivatedRoute) {}

  private _generateInfos() {
    this.selectedRecords = this.query.records.selectedRecords;

    if (this.query.meta) {
      const { totalRecords, indexed } = this.query.meta as MetalDataMeta<MetalExtendedMeta>;
      const selected = this.selectedRecords.length;

      this.selectedInfo = {
        selected: selected ? selected.toLocaleString() : 0,
        total: totalRecords ? totalRecords.toLocaleString() : 0,
        indexed: indexed && indexed < totalRecords ? indexed.toLocaleString() : 0,
      };
    }

    this.displayedBulkActions = this._filterBulkActions(this.bulkActions);
  }

  private _generateRows() {
    this.displayedRows = this.query.records.map((record) => {
      return {
        record,
        actions: this._filterRowActions(this.rowActions || [], record),
      };
    });
  }

  private _filterBulkActions(actions: MetalQueryBulkAction<T>[]): MetalQueryBulkAction<T>[] {
    return actions
      .map((action) => {
        const displayed = { ...action };

        if (typeof action.hidden === 'function') {
          displayed.hidden = !!action.hidden(this.selectedRecords);
        }

        if (typeof action.disabled === 'function') {
          displayed.disabled = !!action.disabled(this.selectedRecords);
        }

        if (Array.isArray(action.children)) {
          displayed.children = this._filterBulkActions(action.children);
        }

        return displayed;
      })
      .filter((action) => !action.hidden);
  }

  private _filterRowActions(actions: MetalQueryRowAction<T>[], record: MetalRecord<T>): MetalQueryRowAction<T>[] {
    return actions
      .map((action) => {
        const displayed = { ...action };

        if (typeof action.hidden === 'function') {
          displayed.hidden = !!action.hidden(record);
        }

        if (typeof action.disabled === 'function') {
          displayed.disabled = !!action.disabled(record);
        }

        if (typeof action.link === 'function') {
          const link: string[] = action.link(record);
          displayed.action = () => {
            return () => this.router.navigate(link) as Promise<any>;
          };
        }

        if (Array.isArray(action.children)) {
          displayed.children = this._filterRowActions(action.children, record);
        }

        if (typeof displayed.action !== 'function') {
          displayed.hidden = true;
        }

        return displayed;
      })
      .filter((action) => !action.hidden);
  }

  private _subscribe() {
    this._unsubscribeQueryEvent = this.query.subscribe();
    this._unsubscribeSelectionChange = this.query.selectionChange.subscribe(() => {
      this._generateInfos();
    });
    this._unsubscribeRecordChange = this.query.recordChange.subscribe(() => {
      this._generateRows();
    });
  }

  private _unsubscribe() {
    if (typeof this._unsubscribeQueryEvent === 'function') {
      this._unsubscribeQueryEvent();
      this._unsubscribeQueryEvent = undefined;
    }

    if (typeof this._unsubscribeSelectionChange === 'function') {
      this._unsubscribeSelectionChange();
      this._unsubscribeSelectionChange = undefined;
    }

    if (typeof this._unsubscribeRecordChange === 'function') {
      this._unsubscribeRecordChange();
      this._unsubscribeRecordChange = undefined;
    }

    // TODO: Remove this once the feature accepted.
    this.query.selectionChange.kick();
  }

  public async ngOnInit(): Promise<void> {
    if (typeof this.resolve === 'function' && this.autoResolve) {
      await this.resolve();
    }

    this._generateRows();
    this._generateInfos();

    const filters = decodeFiltersFromObject(this.activeRoute.snapshot.queryParams);
    if (Object.keys(filters).length) {
      // Handle old params.
      if (filters.where) {
        Object.keys(filters.where).forEach((key) => {
          if (key === 'query') {
            filters.search = filters.where[key];
            delete filters.where[key];
          }
        });
      }

      Object.assign(this.query.filters, filters);
    }

    setTimeout(() => {
      if (!this._readyHandled && this.query.status !== 'sync' && this.autoResolve) {
        this.query
          .fetch()
          .then(() => (this.status = 'ready'))
          .catch(console.error);
      }
    }, 100);

    this.menuClass = document.body.className.includes('body-dark-mode') ? 'dark-mode' : 'light-mode';
    this._subscribe();
  }

  public ready(state: MetalFilterState<T>): void {
    this._readyHandled = true;

    // Handle invalid links.
    if (this.query.filters.where) {
      let rebuild = false;

      for (const { _path, _type } of state.modelRefs) {
        if (_type === 'multiple') {
          const value = _.get(this.query.filters.where, _path);
          const path = `${_path}.inq`;

          if (value) {
            if (!value.inq) {
              rebuild = true;

              _.set(this.query.filters.where, path, [value]);
              _.set(state.model, path, [value]);
            } else if (value.inq && !Array.isArray(value.inq)) {
              rebuild = true;

              _.set(this.query.filters.where, path, [value.inq]);
              _.set(state.model, path, [value.inq]);
            }
          }
        }
      }

      if (rebuild) {
        state.buildActiveModelRefs();
        state.stateChange.emit(state);
      }
    }

    if (this.query.status !== 'sync' && this.autoResolve) {
      this.query
        .fetch()
        .then(() => (this.status = 'ready'))
        .catch(console.error);
    }
  }

  public ngOnDestroy() {
    this._unsubscribe();
  }

  public triggerBulkAction(event: MouseEvent, action: MetalQueryBulkAction<T>): void {
    if (typeof action.action === 'function') {
      return action.action(event, this.query.records.selectedRecords);
    }
  }
}
