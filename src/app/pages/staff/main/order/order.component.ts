import { Component, OnInit } from '@angular/core';
import { appIcons } from '@app/core/helpers/icon.helper';
import { INavRoute } from '@app/core/services/navigation.service';
import { StaffOrderListComponent } from './list/list.component';

@Component({
  selector: 'aka-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class StaffOrderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const StaffOrderNavRoute: INavRoute = {
  path: 'staff/:locid/orders',
  name: 'order',
  title: 'order.parent',
  icon: appIcons.cartArrowDown,
};

export const StaffOrderRoute: INavRoute = {
  ...StaffOrderNavRoute,
  path: '',
  component: StaffOrderComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      title: 'order.parent',
      data: { disableScroll: true },
      component: StaffOrderListComponent,
    },
  ],
};
