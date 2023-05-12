import { Component, Input, OnInit } from '@angular/core';
import { MetalFilterState } from '@lib/metal-data';
import { get, has } from 'lodash';

@Component({
  selector: 'aka-metal-query-company',
  templateUrl: './metal-query-company.component.html',
  styleUrls: ['./metal-query-company.component.scss'],
})
export class MetalQueryCompanyComponent<T> implements OnInit {
  @Input() public state: MetalFilterState<T>;

  public __hasValue = false;

  constructor() {}

  public ngOnInit(): void {
    const filters = this.state.parentQuery.filters;

    if (this.state && filters.where) {
      if (has(filters.where, 'company')) {
        this.__hasValue = true;
        this.state.parentQuery.filters.company = get(filters.where, 'company', null); // Set value from state
        this.apply();
      }
    }
  }

  public apply(isInitialize = true): void {
    const { company } = this.state.parentQuery.filters;

    this.__hasValue = !!company;
    this.state.set('company', company, false);
    this.state.parentQuery.params({ company }, false);

    // If it was the first initialization, page same as params. If it's not then page = 1
    if (!isInitialize) {
      this.state.parentQuery.goto(1, true).catch(console.error);
    }
  }

  // public reset(): void {
  //   this.__hasValue = false;
  //   this.state.parentQuery.filters.company = undefined;
  //   this.state.parentQuery.filters.where = { company: null } as any;
  //   this.state.apply(false);
  // }
}
