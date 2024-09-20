import { Component, OnInit } from '@angular/core';
import { INavRoute } from '@app/core/services/navigation.service';

@Component({
  selector: 'aka-product-detail-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class RestaurantProductDetailOverviewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const RestaurantProductMainDetailOverviewNavRoute: INavRoute = {
  path: 'overview',
  name: 'restaurant.product.main.detail.history',
  title: 'product.main.overview.parent',
};

export const RestaurantProductMainDetailOverviewRoute: INavRoute = {
  ...RestaurantProductMainDetailOverviewNavRoute,
  component: RestaurantProductDetailOverviewComponent,
};
