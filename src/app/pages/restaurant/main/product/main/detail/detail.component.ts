import { Component, OnInit } from '@angular/core';
import { INavRoute } from '@app/core/services/navigation.service';
import {
  RestaurantProductMainDetailHistoryNavRoute,
  RestaurantProductMainDetailHistoryRoute,
} from './history/history.component';
import { RestaurantProductDetailOverviewComponent } from './overview/overview.component';

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
  children: [RestaurantProductMainDetailHistoryNavRoute],
};

export const RestaurantProductMainDetailRoute: INavRoute = {
  ...RestaurantProductMainDetailNavRoute,
  component: RestaurantProductDetailComponent,
  path: '',
  children: [
    {
      path: '',
      pathMatch: 'full',
      name: 'restaurant.product.main.detail.overview',
      title: 'product.main.parent',
      data: { disableScroll: true },
      component: RestaurantProductDetailOverviewComponent,
    },
    RestaurantProductMainDetailHistoryRoute,
  ],
};
