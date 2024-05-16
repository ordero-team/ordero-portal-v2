import { Component, OnInit } from '@angular/core';
import { INavRoute } from '@app/core/services/navigation.service';

@Component({
  selector: 'aka-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const CustomerRestaurantListNavRoute: INavRoute = {
  path: 'list',
  name: 'customer.restaurant.list',
  title: 'customer.restaurant.list.parent',
};

export const CustomerRestaurantListRoute: INavRoute = {
  ...CustomerRestaurantListNavRoute,
  component: ListComponent,
};
