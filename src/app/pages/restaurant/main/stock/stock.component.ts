import { Component } from '@angular/core';
import { appIcons } from '@app/core/helpers/icon.helper';
import { INavRoute } from '@app/core/services/navigation.service';
import { RestaurantStockCreateNavRoute, RestaurantStockCreateRoute } from './create/create.component';
import { StockListComponent } from './list/list.component';

@Component({
  selector: 'aka-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class RestaurantStockComponent {}

export const RestaurantStockNavRoute: INavRoute = {
  path: 'restaurant/:rid/stocks',
  name: 'stock',
  title: 'stock.parent',
  icon: appIcons.roundInventory,
  children: [RestaurantStockCreateNavRoute],
};

export const RestaurantStockRoute: INavRoute = {
  ...RestaurantStockNavRoute,
  path: '',
  component: RestaurantStockComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      title: 'stock.parent',
      data: { disableScroll: true },
      component: StockListComponent,
    },
    RestaurantStockCreateRoute,
  ],
};
