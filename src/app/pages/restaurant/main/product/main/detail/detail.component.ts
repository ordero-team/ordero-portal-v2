import { Component, OnInit } from '@angular/core';
import { INavRoute } from '@app/core/services/navigation.service';
import {
  RestaurantProductMainDetailHistoryNavRoute,
  RestaurantProductMainDetailHistoryRoute,
} from './history/history.component';
import {
  RestaurantProductDetailOverviewComponent,
  RestaurantProductMainDetailOverviewNavRoute,
  RestaurantProductMainDetailOverviewRoute,
} from './overview/overview.component';
import { ProductSingleResolve } from '@app/collections/owner/product.collection';

@Component({
  selector: 'aka-product-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class RestaurantProductDetailComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const RestaurantProductMainDetailNavRoute: INavRoute = {
  path: ':product_id',
  name: 'restaurant.product.main.detail',
  title: 'product.main.detail.parent',
  children: [RestaurantProductMainDetailOverviewNavRoute, RestaurantProductMainDetailHistoryNavRoute],
};

export const RestaurantProductMainDetailRoute: INavRoute = {
  ...RestaurantProductMainDetailNavRoute,
  maps: {
    product: ['title', 'sku'],
  },
  resolve: {
    product: ProductSingleResolve,
  },
  runGuardsAndResolvers: 'always',
  component: RestaurantProductDetailComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'overview',
    },
    RestaurantProductMainDetailOverviewRoute,
    RestaurantProductMainDetailHistoryRoute,
  ],
};
