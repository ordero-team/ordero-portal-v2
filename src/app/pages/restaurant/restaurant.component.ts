import { Component, OnInit } from '@angular/core';
import { INavRoute } from '@app/core/services/navigation.service';
import { RestaurantAuthNavRoute, RestaurantAuthRoute } from './auth/auth.component';

@Component({
  selector: 'aka-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const RestaurantNavRoute: INavRoute = {
  path: '',
  name: 'restaurant',
  title: 'restaurant.parent',
  children: [RestaurantAuthNavRoute],
};

export const RestaurantRoute: INavRoute = {
  ...RestaurantNavRoute,
  component: RestaurantComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'restaurant.auth',
    },
    RestaurantAuthRoute,
  ],
};
