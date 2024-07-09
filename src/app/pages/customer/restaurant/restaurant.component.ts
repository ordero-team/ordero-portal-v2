import { Component, OnInit } from '@angular/core';
import { INavRoute } from '@app/core/services/navigation.service';
import { CustomerRestaurantDetailNavRoute, CustomerRestaurantDetailRoute } from './detail/detail.component';
import { CustomerRestaurantListNavRoute, CustomerRestaurantListRoute } from './list/list.component';

@Component({
  selector: 'aka-restaurant',
  template: `<router-outlet></router-outlet>`,
})
export class RestaurantComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const CustomerRestaurantNavRoute: INavRoute = {
  path: 'restaurants',
  name: 'customer.restaurant',
  title: 'customer.restaurant.parent',
  children: [CustomerRestaurantListNavRoute, CustomerRestaurantDetailNavRoute],
};

export const CustomerRestaurantRoute: INavRoute = {
  ...CustomerRestaurantNavRoute,
  component: RestaurantComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'list',
    },
    CustomerRestaurantListRoute,
    CustomerRestaurantDetailRoute,
  ],
};
