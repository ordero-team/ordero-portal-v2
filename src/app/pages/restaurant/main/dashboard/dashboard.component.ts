import { Component, OnInit } from '@angular/core';
import { appIcons } from '@app/core/helpers/icon.helper';
import { INavRoute } from '@app/core/services/navigation.service';
import { time } from '@lib/time';

@Component({
  selector: 'aka-restaurant-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class RestaurantDashboardComponent implements OnInit {
  date: { start: number; end: number };

  constructor() {}

  ngOnInit(): void {}

  callbackDateRange(e: any) {
    const startDate = time.tz(e.start, 'UTC').subtract(1, 'day').set('hour', 17).set('minute', 0).set('second', 0).unix();
    const endDate = time.tz(e.end, 'UTC').utc().set('hour', 16).set('minute', 59).set('second', 59).unix();

    this.date = {
      start: Number(startDate),
      end: Number(endDate),
    };
  }
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
