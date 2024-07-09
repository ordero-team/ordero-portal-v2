import { Component, OnInit } from '@angular/core';
import { appIcons } from '@app/core/helpers/icon.helper';
import { INavRoute } from '@app/core/services/navigation.service';
import { TableListComponent } from './list/list.component';

@Component({
  selector: 'aka-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class StaffTableComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const StaffTableNavRoute: INavRoute = {
  path: 'staff/:locid/tables',
  name: 'table',
  title: 'table.parent',
  icon: appIcons.outlineTableRestaurant,
};

export const StaffTableRoute: INavRoute = {
  ...StaffTableNavRoute,
  path: '',
  component: StaffTableComponent,
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
