import { RoleGuardService } from '@app/core/guards/role-guard.service';
import { appIcons } from '@app/core/helpers/icon.helper';
import { INavRoute } from '@cs/navigation.service';
import { DashboardNavRoute } from './dashboard/dashboard.component';

export const MainSectionNavRoute: INavRoute = {
  name: 'main',
  title: 'main_section',
  // subtitle: 'main',
  type: 'group',
  icon: appIcons.basketPlusOutline,
  canActivate: [RoleGuardService],
  roles: ['admin', 'staff'],

  // @TODO: Report Nav Route
  children: [DashboardNavRoute],
};
