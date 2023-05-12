import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { AuthGuardService, GuestGuardService } from '@app/core/guards/auth-guard.service';
import { EmptyComponent } from '@app/layouts/empty/empty.component';
import { VerticalComponent } from '@app/layouts/vertical/vertical.component';

import { MainSectionNavRoute } from '@app/pages/main-section/main-section.component';
import { SettingNavRoute } from '@app/pages/setting/setting.component';
import { INavMainRoutes, INavRoute, NavigationService } from '@cs/navigation.service';

const routes: INavMainRoutes = [
  {
    path: '',
    title: 'auth.parent',
    component: EmptyComponent,
    canActivate: [GuestGuardService],
    loadChildren: () => import('@pg/auth/auth.module').then((m) => m.AuthModule),
  },

  // Main Section
  {
    path: '',
    title: 'root',
    component: VerticalComponent,
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    children: [
      {
        path: 'dashboard',
        title: 'dashboard',
        loadChildren: () => import('@pg/main-section/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'settings',
        title: 'setting.parent',
        loadChildren: () => import('@pg/setting/setting.module').then((m) => m.SettingModule),
      },
    ],
  },

  // Error
  {
    path: 'error',
    title: 'error',
    component: EmptyComponent,
    loadChildren: () => import('@pg/error/error.module').then((m) => m.ErrorModule),
  },
  {
    path: '**',
    title: 'error',
    redirectTo: 'error',
  },
];
const routerConfig: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  preloadingStrategy: PreloadAllModules,
  relativeLinkResolution: 'legacy',
};

const navRoutes: INavRoute[] = [MainSectionNavRoute, SettingNavRoute];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule],
})
export class KeeppackRoutingModule {
  constructor(nav: NavigationService) {
    nav.register(navRoutes);
  }
}
