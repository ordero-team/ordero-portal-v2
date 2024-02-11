import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { AuthGuardService } from '@app/core/guards/auth-guard.service';
import { OwnerGuardGuardService, OwnerGuestGuardService } from '@app/core/guards/owner-guard.service';
import { EmptyComponent } from '@app/layouts/empty/empty.component';
import { VerticalComponent } from '@app/layouts/vertical/vertical.component';
import { LibrarySectionNavRoute } from '@app/pages/library-section/library-section.component';

import { MainSectionNavRoute } from '@app/pages/main-section/main-section.component';
import { RestaurantNavRoute } from '@app/pages/restaurant/restaurant.component';
import { SettingNavRoute } from '@app/pages/setting/setting.component';
import { INavMainRoutes, INavRoute, NavigationService } from '@cs/navigation.service';

const routes: INavMainRoutes = [
  {
    path: '',
    title: 'home.parent',
    component: EmptyComponent,
    loadChildren: () => import('@pg/home/home.module').then((m) => m.HomeModule),
  },

  {
    path: 'restaurant',
    title: 'restaurant.parent',
    children: [
      {
        path: '',
        title: 'home.parent',
        component: VerticalComponent,
        loadChildren: () => import('@pg/restaurant/restaurant.module').then((m) => m.RestaurantModule),
        canActivate: [OwnerGuardGuardService],
        canActivateChild: [OwnerGuardGuardService],
        children: [
          {
            path: 'dashboard',
            title: 'dashboard',
            loadChildren: () => import('@pg/main-section/dashboard/dashboard.module').then((m) => m.DashboardModule),
          },
          {
            path: 'table',
            title: 'table.parent',
            loadChildren: () => import('@pg/main-section/table/table.module').then((m) => m.TableModule),
          },
          {
            path: 'categories',
            title: 'category.parent',
            loadChildren: () => import('@pg/library-section/category/category.module').then((m) => m.CategoryModule),
          },
          {
            path: 'settings',
            title: 'setting.parent',
            loadChildren: () => import('@pg/setting/setting.module').then((m) => m.SettingModule),
          },
        ],
      },
      {
        path: 'auth',
        title: 'auth.parent',
        component: EmptyComponent,
        canActivate: [OwnerGuestGuardService],
        loadChildren: () => import('@pg/restaurant/auth/auth.module').then((m) => m.RestaurantAuthModule),
      },
    ],
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
        path: 'table',
        title: 'table.parent',
        loadChildren: () => import('@pg/main-section/table/table.module').then((m) => m.TableModule),
      },
      {
        path: 'categories',
        title: 'category.parent',
        loadChildren: () => import('@pg/library-section/category/category.module').then((m) => m.CategoryModule),
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

const navRoutes: INavRoute[] = [MainSectionNavRoute, LibrarySectionNavRoute, SettingNavRoute, RestaurantNavRoute];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule],
})
export class KeeppackRoutingModule {
  constructor(nav: NavigationService) {
    nav.register(navRoutes);
  }
}
