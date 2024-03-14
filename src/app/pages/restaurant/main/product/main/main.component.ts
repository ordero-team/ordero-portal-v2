import { Component, OnInit } from '@angular/core';
import { INavRoute } from '@app/core/services/navigation.service';

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
};

export const RestaurantProductMainRoute: INavRoute = {
  ...RestaurantProductMainNavRoute,
  component: RestaurantProductMainComponent,
};
