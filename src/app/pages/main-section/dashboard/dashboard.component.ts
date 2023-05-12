import { Component } from '@angular/core';
import { PermissionGuardService } from '@app/core/guards/permission-guard.service';
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
  canActivate: [PermissionGuardService],
  permissions: ['staff_dashboard@read'],
};

export const DashboardRoute: INavRoute = {
  ...DashboardNavRoute,
  path: '',
  component: DashboardComponent,
};
