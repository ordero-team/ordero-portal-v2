import { ActivatedRoute, Router } from '@angular/router';
import { IRestFilters } from '@lib/resource/interface';
import { EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

export class BaseFilter {
  /**
   * A property to store the filters, so any other services can use it directly.
   */
  public params: IRestFilters | any = {};
  /**
   * An event emitter that will be triggered when there is a change on the filters.
   */
  public changes = new EventEmitter<FilterEvent>();

  /**
   * @constructor
   * @param active {ActivatedRoute} - Used as reference for building URL Tree.
   * @param router {Router} - Used to create a URL Tree
   * @param location {Location} - Used to replace the browser's address bar.
   */
  constructor(private active: ActivatedRoute, private router: Router, private location: Location) {}

  /**
   * Apply the current filters into browser's address bar and fire an {@link FilterEvent} event.
   */
  public applyFilters(): void {
    this.exportURLFilters();
    this.changes.emit(new FilterEvent(this.params));
  }

  /**
   * Import queryParams from browser's address bar. This method useful for initial page load.
   * @param params - An object contains queryParams.
   */
  public importURLFilters(params: any): void {
    this.params = {};
    for (const [key, value] of Object.entries(params) as Array<[string, string]>) {
      this.params[key] = value;
    }

    this.changes.emit(new FilterEvent(this.params));
  }

  /**
   * Apply the current filters into browser's address bar.
   */
  public exportURLFilters(): void {
    const params: any = {};

    for (const [key, value] of Object.entries(this.params)) {
      if (value) {
        params[key] = value;
      }
    }

    const url = this.router.createUrlTree(['./'], {
      queryParams: params,
      relativeTo: this.active,
    });

    this.location.go(url.toString());
  }

  /**
   * Remove all filters and apply the changes.
   */
  public clearAll(propagate = true): void {
    for (const key of Object.keys(this.params)) {
      if (Array.isArray(this.params[key])) {
        this.params[key] = [];
      } else {
        this.params[key] = '';
      }
    }

    if (propagate) {
      this.applyFilters();
    }
  }

  /**
   * Remove filter from the current filters.
   * @param key - Filter key to remove.
   * @param value - Filter value to remove.
   */
  public removeFilter(key: string, value?: string): void {
    if (value && this.params[key] && this.params[key].includes('~')) {
      const values = this.params[key].replace('~', '').split(',');
      values.splice(values.indexOf(value), 1);

      if (values.length) {
        this.params[key] = `~${values.join(',')}`;
      } else {
        this.params[key] = null;
      }
    } else {
      this.params[key] = null;
    }

    this.applyFilters();
  }

  public assignParams(obj: IRestFilters | any = {}) {
    this.params = Object.assign({}, this.params, obj);
    this.exportURLFilters();
  }

  /**
   * Set a specific filter and apply the changes. Leave the value empty to remove the filter.
   * @param keyObj
   * @param value
   */
  public set(keyObj: string | any, value?: string): void {
    if (typeof keyObj === 'string') {
      if (value) {
        this.params[keyObj] = value;
      } else {
        this.params[keyObj] = null;
      }
    } else {
      this.params.rem();
      this.params.set(keyObj);
    }

    return this.applyFilters();
  }
}

/**
 * Filter Event Class
 * An event object contains a mapped filter from the {@link BaseFilter}
 */
export class FilterEvent {
  constructor(filters: any = {}) {
    for (const [key, value] of Object.entries(filters) as Array<[string, any]>) {
      this[key] = value;
    }
  }
}
