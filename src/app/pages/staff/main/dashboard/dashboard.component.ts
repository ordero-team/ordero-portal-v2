import { Component, OnInit } from '@angular/core';
import { appIcons } from '@app/core/helpers/icon.helper';
import { INavRoute } from '@app/core/services/navigation.service';

@Component({
  selector: 'aka-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const StaffDashboardNavRoute: INavRoute = {
  path: 'staff/:locid/dashboard',
  name: 'restaurant.dashboard',
  title: 'dashboard.parent',
  icon: appIcons.outlineHome,
};

export const StaffDashboardRoute: INavRoute = {
  ...StaffDashboardNavRoute,
  path: '',
  component: DashboardComponent,
};
