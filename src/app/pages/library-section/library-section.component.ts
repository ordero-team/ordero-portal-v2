import { RoleGuardService } from '@app/core/guards/role-guard.service';
import { INavRoute } from '@cs/navigation.service';
import { CategoryNavRoute } from './category/category.component';

export const LibrarySectionNavRoute: INavRoute = {
  name: 'library',
  title: 'library_section',
  // subtitle: 'library',
  type: 'group',
  canActivate: [RoleGuardService],
  roles: ['owner'],

  // @TODO: Report Nav Route
  children: [CategoryNavRoute],
};
