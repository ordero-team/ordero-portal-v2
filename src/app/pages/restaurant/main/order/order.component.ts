import { Component, OnInit } from '@angular/core';
import { appIcons } from '@app/core/helpers/icon.helper';
import { INavRoute } from '@app/core/services/navigation.service';
import { OrderListComponent } from './list/list.component';

@Component({
  selector: 'aka-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class RestaurantOrderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const RestaurantOrderNavRoute: INavRoute = {
  path: 'restaurant/:rid/orders',
  name: 'order',
  title: 'order.parent',
  icon: appIcons.cartArrowDown,
};

export const RestaurantOrderRoute: INavRoute = {
  ...RestaurantOrderNavRoute,
  path: '',
  component: RestaurantOrderComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      title: 'order.parent',
      data: { disableScroll: true },
      component: OrderListComponent,
    },
  ],
};
