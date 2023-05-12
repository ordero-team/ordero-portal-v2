import { AfterViewInit, ChangeDetectorRef, Directive, Host, Input, OnDestroy, OnInit } from '@angular/core';
import { MetalFilterState } from '@lib/metal-data';
import { QCellDirective } from '@mtl/components/metal-query-table/metal-query-table.component';
import { MetalQueryComponent } from '@mtl/components/metal-query/metal-query.component';
import { get } from 'lodash';

@Directive({
  selector: '[akaMetalSort]',
})
export class SortDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input() akaMetalSort: string;

  public state: MetalFilterState<any>;

  constructor(
    @Host() public cellDirective: QCellDirective<any>,
    @Host() public metalQuery: MetalQueryComponent<any>,
    private cd: ChangeDetectorRef
  ) {}

  classField = 'aka-sort-head';
  activeField: any;

  currentSort = '';
  currentParams = '';

  ngOnInit(): void {
    this.state = new MetalFilterState<any>(this.metalQuery.query);

    const resSort = get(this.state.parentQuery, 'filters.params.sort', '');
    if (resSort !== '') {
      this.currentSort = resSort;
    } else {
      this.currentSort = this.akaMetalSort;
    }

    this.currentParams = get(this.state.parentQuery, 'filters.params', {});

    // Add Cell Class
    if (this.cellDirective) {
      this.classField = `${this.classField} aka-sort-field-${this.akaMetalSort}`;
      this.cellDirective.class = this.classField;

      this.setDirection();
    }
  }

  public ngOnDestroy() {
    this.classField = 'aka-sort-head';
    this.activeField = null;
  }

  public ngAfterViewInit() {
    const field = document.getElementsByClassName(this.classField);
    if (field && field.length > 0) {
      this.activeField = field[field.length - 1];
      this.activeField.addEventListener('click', this.goSort.bind(this));
    }

    this.cd.detectChanges();
  }

  get activated() {
    return this.currentSort.replace(/^-|-$/, '') === this.akaMetalSort;
  }

  get direction() {
    if (this.activated) {
      return this.currentSort.indexOf('-') === 0 ? 'desc' : 'asc';
    }

    return 'asc';
  }

  async goSort() {
    this.currentSort = (this.direction === 'asc' ? '-' : '') + this.akaMetalSort;
    let params = { sort: this.currentSort };

    if (this.currentParams) {
      params = Object.assign({}, params, this.currentParams);
    }
    await this.state.parentQuery.params(params, true);

    this.setDirection();
  }

  setDirection() {
    const directionClass = this.direction === 'asc' ? 'aka-sort-asc' : 'aka-sort-desc';
    this.cellDirective.class = `${this.classField} ${directionClass}`;
  }
}
