import { Component, OnInit } from '@angular/core';
import { appIcons } from '@app/core/helpers/icon.helper';
import { INavRoute } from '@app/core/services/navigation.service';
import { StaffProductMainCreateNavRoute, StaffProductMainCreateRoute } from './create/create.component';
import { StaffProductMainDetailNavRoute, StaffProductMainDetailRoute } from './detail/detail.component';
import { StaffProductMainListNavRoute, StaffProductMainListRoute } from './list/list.component';

@Component({
  selector: 'aka-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class StaffProductMainComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const StaffProductMainNavRoute: INavRoute = {
  path: 'main',
  name: 'staff.product.main',
  title: 'product.main.parent',
  icon: appIcons.formatListBulleted,
  children: [StaffProductMainListNavRoute, StaffProductMainCreateNavRoute, StaffProductMainDetailNavRoute],
};

export const StaffProductMainRoute: INavRoute = {
  ...StaffProductMainNavRoute,
  component: StaffProductMainComponent,
  children: [StaffProductMainListRoute, StaffProductMainCreateRoute, StaffProductMainDetailRoute],
};
