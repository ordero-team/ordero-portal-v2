import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, StoreCollection } from '@app/collections/store.collection';
import { AuthService } from '@app/core/services/auth.service';
import { MetalDataRef, MetalFilterState } from '@lib/metal-data';
import _ from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'aka-metal-query-store',
  templateUrl: './metal-query-store.component.html',
  styleUrls: ['./metal-query-store.component.scss'],
})
export class MetalQueryStoreComponent implements OnInit, OnDestroy {
  store: Store;
  model: MetalDataRef<Store>;

  @Input() state: MetalFilterState<any>;
  @Input() defaultParam = {};

  @Output() change = new EventEmitter<any>();

  public __hasValue = false;

  private _unsubscribeRoute: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private storeCollection: StoreCollection, private auth: AuthService) {}

  ngOnDestroy(): void {
    this._unsubscribeRoute.unsubscribe();
    this.state.clear();
  }

  public ngOnInit(): void {
    this.model = this.state.buildModels();
    this._unsubscribeRoute = this.activatedRoute.queryParams.subscribe((val) => {
      if (_.has(val, 'store_id')) {
        this.storeCollection.findOne(val.store_id, { params: this.defaultParam }).then((val) => {
          this.store = val;
          this.apply(val);
        });
      }
    });
  }

  public apply(val: any, isInitialize = true): void {
    if (val) {
      const { id: store_id } = val;

      this.__hasValue = !!store_id;

      _.set(this.model, 'store_id', store_id);
      this.defaultParam = Object.assign({}, { ...this.defaultParam }, { store_id });
    } else {
      _.set(this.model, 'store_id', undefined);
      this.defaultParam = Object.assign({}, { ...this.defaultParam }, { store_id: null });
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
