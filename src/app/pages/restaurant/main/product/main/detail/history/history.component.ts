import { Component, OnInit } from '@angular/core';
import { INavRoute } from '@app/core/services/navigation.service';

@Component({
  selector: 'aka-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class RestaurantProductDetailHistoryComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const RestaurantProductMainDetailHistoryNavRoute: INavRoute = {
  path: 'histories',
  name: 'restaurant.product.main.detail.history',
  title: 'product.main.create.parent',
};

export const RestaurantProductMainDetailHistoryRoute: INavRoute = {
  ...RestaurantProductMainDetailHistoryNavRoute,
  component: RestaurantProductDetailHistoryComponent,
};
