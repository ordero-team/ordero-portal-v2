import { Component, OnInit } from '@angular/core';
import { appIcons } from '@app/core/helpers/icon.helper';
import { INavRoute } from '@app/core/services/navigation.service';
import { TableListComponent } from './list/list.component';

@Component({
  selector: 'aka-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class RestaurantTableComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const RestaurantTableNavRoute: INavRoute = {
  path: 'restaurant/:rid/tables',
  name: 'table',
  title: 'table.parent',
  icon: appIcons.outlineTableRestaurant,
};

export const RestaurantTableRoute: INavRoute = {
  ...RestaurantTableNavRoute,
  path: '',
  component: RestaurantTableComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      title: 'table.parent',
      data: { disableScroll: true },
      component: TableListComponent,
    },
  ],
};
