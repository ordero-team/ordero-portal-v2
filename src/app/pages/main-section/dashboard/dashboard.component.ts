import { Component } from '@angular/core';
import { appIcons } from '@ch/icon.helper';
import { INavRoute } from '@cs/navigation.service';

@Component({
  selector: 'aka-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {}

export const DashboardNavRoute: INavRoute = {
  path: 'dashboard',
  name: 'dashboard',
  title: 'dashboard',
  icon: appIcons.outlineHome,
};

export const DashboardRoute: INavRoute = {
  ...DashboardNavRoute,
  path: '',
  component: DashboardComponent,
};
