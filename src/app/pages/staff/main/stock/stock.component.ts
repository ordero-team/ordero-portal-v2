import { Component, OnInit } from '@angular/core';
import { appIcons } from '@app/core/helpers/icon.helper';
import { INavRoute } from '@app/core/services/navigation.service';
import { StaffStockCreateNavRoute, StaffStockCreateRoute } from './create/create.component';
import { StockListComponent } from './list/list.component';

@Component({
  selector: 'aka-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StaffStockComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const StaffStockNavRoute: INavRoute = {
  path: 'staff/:locid/stocks',
  name: 'stock',
  title: 'stock.parent',
  icon: appIcons.roundInventory,
  children: [StaffStockCreateNavRoute],
};

export const StaffStockRoute: INavRoute = {
  ...StaffStockNavRoute,
  path: '',
  component: StaffStockComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      title: 'stock.parent',
      data: { disableScroll: true },
      component: StockListComponent,
    },
    StaffStockCreateRoute,
  ],
};
