import { Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  MappedDataRef,
  MetalDataRef,
  MetalModelRef,
  MetalModelRefs,
  MetalModelRefTranslation,
  MetalQuery,
  typeOf,
} from '@lib/metal-data';
import { Unsubscribe } from '@lib/metal-data/event';
import { MetalFilterState } from '@lib/metal-data/filter-state';
import { decodeModelURIFromURL } from '@lib/metal-data/utils/filter';
import { MetalDateService } from '@mtl/services/metal-date.service';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ps-metal-query-filter',
  templateUrl: './metal-query-filter.component.html',
  styleUrls: ['./metal-query-filter.component.scss'],
  exportAs: 'queryFilter',
})
export class MetalQueryFilterComponent<T> implements OnInit, OnDestroy {
  public status: 'init' | 'ready' = 'init';
  public state: MetalFilterState<T>;
  public activeModelRefs: MappedDataRef[] = [];

  @Input() public query: MetalQuery<T>;
  @Input() public transformModelRefs: (ref: MetalModelRefs<T>, refs: MetalModelRef[]) => void;
  @Input() public transformActiveModelRefs: (refs: MappedDataRef[]) => void;
  @Input() public translations: MetalModelRefTranslation = {};

  @Output()
  public stateChange: EventEmitter<MetalFilterState<T>> = new EventEmitter<MetalFilterState<T>>();

  private _unsubscribeState: Unsubscribe;
  private _unsubscribeQuery: Unsubscribe;
  private _unsubscribeMetas: Unsubscribe;
  private _unsubscribeModel: Unsubscribe;
  private _unsubscribeRoute: Subscription;

  @ContentChild(TemplateRef) queryFilterBarTemplate: TemplateRef<any>;

  constructor(private date: MetalDateService, private router: Router) {}

  public ngOnInit(): void {
    this.state = new MetalFilterState<T>(this.query);

    if (!this.state.activeModelRefKeys.length) {
      const activeKeys = decodeModelURIFromURL()
        .map((ref) => ref.key.replace('.inq', '').replace('.between', ''))
        .filter((ref) => !['page', 'limit', 'search'].includes(ref));

      if (activeKeys.length) {
        this.state.activeModelRefKeys = activeKeys;
      }
    }

    if (typeOf(this.translations) === 'object') {
      this.state.translations = this.translations;
    }

    if (typeof this.transformModelRefs === 'function') {
      this.state.transformModelRefs = this.transformModelRefs;
    }

    if (typeof this.transformActiveModelRefs === 'function') {
      this.state.transformActiveModelRefs = this.transformActiveModelRefs;
    }

    this._unsubscribeState = this.state.stateChange.subscribe((event) => {
      this.stateChange.emit(event);
    });

    this._unsubscribeModel = this.state.activeModelChange.subscribe((refs) => {
      this.activeModelRefs = refs.map((ref) => {
        const { key, type, label, value, translations, humanize, uppercase } = ref;
        const mapped = { key, value, type, label, translations, humanize, uppercase };

        if (typeof value === 'string' && this.date.isFilter(value)) {
          const { start, end, shortcut, zone } = this.date.fromFilterLabel(value);
          const suffix = zone ? ` (${zone})` : '';

          if (start && end) {
            mapped.value = [`${start}${suffix}`, `${end}${suffix}`];
            mapped.type = 'date-range';
          } else {
            mapped.value = `${shortcut}${suffix}`;
          }
        }

        return mapped;
      });
    });

    this._unsubscribeQuery = this.query.statusChange.subscribe((query) => {
      if (query.status === 'sync') {
        this.state.encodeModelURI();
      }
    });

    this._unsubscribeMetas = this.query.metaChange.subscribe(() => {
      if (this.state.status === 'ready') {
        this.state.applyParentMetas();
      }
    });

    if (this.query.collection.configs['index']) {
      this.state.init();
    }

    this.status = 'ready';

    this._unsubscribeRoute = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const model: MetalDataRef<T> = this.state.buildModels();
        const filters = decodeModelURIFromURL();

        // Handle old params.
        for (const filter of filters) {
          if (filter.key === 'query') {
            filter.key = 'search';
          }
        }

        if (!filters.filter((ref) => ref.key === 'search').length) {
          _.set(this.query.filters, 'search', undefined);
        }

        for (const ref of filters) {
          if (['page', 'limit', 'search'].includes(ref.key)) {
            _.set(this.query.filters, ref.key, ref.value);
          } else {
            _.set(model, ref.key, ref.value);
          }
        }

        this.state.model = model;
        this.state.pushLocationStrategy = 'replace';
        this.query.metaChange.emit(this.query.meta);
        this.state.apply(false);
      }
    });
  }

  public ngOnDestroy() {
    if (typeof this._unsubscribeState === 'function') {
      this._unsubscribeState();
    }

    if (typeof this._unsubscribeModel === 'function') {
      this._unsubscribeModel();
    }

    if (typeof this._unsubscribeQuery === 'function') {
      this._unsubscribeQuery();
    }

    if (typeof this._unsubscribeMetas === 'function') {
      this._unsubscribeMetas();
    }

    if (this._unsubscribeRoute) {
      this._unsubscribeRoute.unsubscribe();
    }
  }

  public clearSearch(): void {
    const elem: HTMLInputElement = document.querySelector('ps-metal-query-search input');

    if (elem) {
      elem.focus();
    }

    this.state.parentQuery.filters.search = undefined;

    setTimeout(() => {
      this.state.apply();
    }, 50);
  }
}
