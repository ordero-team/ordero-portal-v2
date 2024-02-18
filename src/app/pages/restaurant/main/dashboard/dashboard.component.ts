import { Component, OnInit } from '@angular/core';
import { appIcons } from '@app/core/helpers/icon.helper';
import { INavRoute } from '@app/core/services/navigation.service';

@Component({
  selector: 'aka-restaurant-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class RestaurantDashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const RestaurantDashboardNavRoute: INavRoute = {
  path: 'restaurant/:rid/dashboard',
  name: 'restaurant.dashboard',
  title: 'dashboard.parent',
  icon: appIcons.outlineHome,
};

export const RestaurantDashboardRoute: INavRoute = {
  ...RestaurantDashboardNavRoute,
  path: '',
  component: RestaurantDashboardComponent,
};
