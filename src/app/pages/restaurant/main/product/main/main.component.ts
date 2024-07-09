import { Component, OnInit } from '@angular/core';
import { appIcons } from '@app/core/helpers/icon.helper';
import { INavRoute } from '@app/core/services/navigation.service';
import { RestaurantProductMainCreateNavRoute, RestaurantProductMainCreateRoute } from './create/create.component';
import { RestaurantProductMainDetailNavRoute, RestaurantProductMainDetailRoute } from './detail/detail.component';
import { RestaurantProductMainListNavRoute, RestaurantProductMainListRoute } from './list/list.component';

@Component({
  selector: 'aka-product-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class RestaurantProductMainComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const RestaurantProductMainNavRoute: INavRoute = {
  path: 'main',
  name: 'restaurant.product.main',
  title: 'product.main.parent',
  icon: appIcons.formatListBulleted,
  children: [RestaurantProductMainListNavRoute, RestaurantProductMainCreateNavRoute, RestaurantProductMainDetailNavRoute],
};

export const RestaurantProductMainRoute: INavRoute = {
  ...RestaurantProductMainNavRoute,
  component: RestaurantProductMainComponent,
  children: [RestaurantProductMainListRoute, RestaurantProductMainCreateRoute, RestaurantProductMainDetailRoute],
};
