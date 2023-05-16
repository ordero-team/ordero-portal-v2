import { Component, OnInit } from '@angular/core';
import { appIcons } from '@app/core/helpers/icon.helper';
import { INavRoute } from '@app/core/services/navigation.service';
import { TableDetailNavRoute, TableDetailRoute } from './detail/detail.component';
import { TableListNavRoute, TableListRoute } from './list/list.component';

@Component({
  selector: 'aka-table',
  template: `<router-outlet></router-outlet>`,
})
export class TableComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const TableNavRoute: INavRoute = {
  path: 'table',
  name: 'table',
  title: 'table.parent',
  icon: appIcons.outlineTableRestaurant,
  children: [TableListNavRoute, TableDetailNavRoute],
};

export const TableRoute: INavRoute = {
  ...TableNavRoute,
  path: '',
  component: TableComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'list',
    },
    TableListRoute,
    TableDetailRoute,
  ],
};
