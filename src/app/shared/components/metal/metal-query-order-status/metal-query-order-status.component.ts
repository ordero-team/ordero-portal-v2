import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderCollection } from '@app/collections/order.collection';
import { AuthService } from '@app/core/services/auth.service';
import { MetalDataRef, MetalFilterState } from '@lib/metal-data';
import _ from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'aka-metal-query-order-status',
  templateUrl: './metal-query-order-status.component.html',
  styleUrls: ['./metal-query-order-status.component.scss'],
})
export class MetalQueryOrderStatusComponent implements OnInit, OnDestroy {
  order_status: any;
  model: MetalDataRef<any>;

  @Input() state: MetalFilterState<any>;
  @Input() defaultParam = {};
  @Input() status = '';

  @Output() change = new EventEmitter<any>();

  public __hasValue = false;

  private _unsubscribeRoute: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private orderCollection: OrderCollection, private auth: AuthService) {}

  ngOnDestroy(): void {
    this._unsubscribeRoute.unsubscribe();
    this.state.clear();
  }

  public ngOnInit(): void {
    this.model = this.state.buildModels();
    this._unsubscribeRoute = this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (_.has(queryParams, 'order_status')) {
        const status = _.get(queryParams, 'order_status');
        this.orderCollection.find({}, { params: this.defaultParam, suffix: 'statuses' }).then((data: any) => {
          this.order_status = _.find(data, ({ name }) => name === status);
          this.apply(this.order_status);
        });
      }
    });
  }

  public apply(val: any, isInitialize = true): void {
    if (val) {
      const { name: order_status } = val;

      this.__hasValue = !!order_status;

      _.set(this.model, 'order_status', order_status);
      this.defaultParam = Object.assign({}, { ...this.defaultParam }, { order_status });
    } else {
      _.set(this.model, 'order_status', undefined);
      this.defaultParam = Object.assign({}, { ...this.defaultParam }, { order_status: undefined });
    }

    this.change.emit({ state: this.state, defaultParam: this.defaultParam });

    this.state.parentQuery.params({ ...this.defaultParam }, false);
    this.state.model = this.model;
    this.state.pushLocationStrategy = 'replace';
    this.state.apply();

    // If it was the first initialization, page same as params. If it's not then page = 1
    if (!isInitialize) {
      this.state.parentQuery.goto(1, true).catch(console.error);
    }
  }
}
