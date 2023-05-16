import { RoleGuardService } from '@app/core/guards/role-guard.service';
import { INavRoute } from '@cs/navigation.service';
import { DashboardNavRoute } from './dashboard/dashboard.component';
import { TableNavRoute } from './table/table.component';

export const MainSectionNavRoute: INavRoute = {
  name: 'main',
  title: 'main_section',
  // subtitle: 'main',
  type: 'group',
  canActivate: [RoleGuardService],
  roles: ['owner'],

  // @TODO: Report Nav Route
  children: [DashboardNavRoute, TableNavRoute],
};
