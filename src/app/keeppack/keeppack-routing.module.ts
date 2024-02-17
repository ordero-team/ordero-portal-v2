import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import {
  OwnerAuthGuardService,
  OwnerGuestGuardService,
  OwnerVerifiedGuardService,
} from '@app/core/guards/owner-guard.service';
import { RestaurantGuardService } from '@app/core/guards/restaurant-guard.service';
import { RoleStateModel } from '@app/core/states/role/role.actions';
import { EmptyComponent } from '@app/layouts/empty/empty.component';
import { VerticalComponent } from '@app/layouts/vertical/vertical.component';
import { RestaurantDashboardNavRoute } from '@app/pages/restaurant/main/dashboard/dashboard.component';
import { RestaurantSettingNavRoute } from '@app/pages/restaurant/main/setting/setting.component';
import { INavMainRoutes, INavRoute, NavigationService } from '@cs/navigation.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { get } from 'lodash';
import { Observable } from 'rxjs';

const routes: INavMainRoutes = [
  // Landing routes
  {
    path: '',
    title: 'home.parent',
    component: EmptyComponent,
    loadChildren: () => import('@pg/home/home.module').then((m) => m.HomeModule),
  },

  // Restaurant routes
  {
    path: 'restaurant/auth',
    title: 'auth.parent',
    component: EmptyComponent,
    loadChildren: () => import('@pg/restaurant/auth/auth.module').then((m) => m.RestaurantAuthModule),
  },

  {
    path: 'restaurant',
    title: '',
    canActivate: [OwnerGuestGuardService],
  },

  {
    path: 'restaurant/:rid/dashboard',
    title: 'dashboard.parent',
    canActivate: [OwnerAuthGuardService, OwnerVerifiedGuardService, RestaurantGuardService],
    component: VerticalComponent,
    loadChildren: () => import('@pg/restaurant/main/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },

  {
    path: 'restaurant/:rid/settings',
    title: 'setting.parent',
    canActivate: [OwnerVerifiedGuardService, RestaurantGuardService],
    component: VerticalComponent,
    loadChildren: () => import('@pg/restaurant/main/setting/setting.module').then((m) => m.SettingModule),
  },

  // Main Section
  // {
  //   path: '',
  //   title: 'root',
  //   component: VerticalComponent,
  //   canActivate: [AuthGuardService],
  //   canActivateChild: [AuthGuardService],
  //   children: [
  //     {
  //       path: 'dashboard',
  //       title: 'dashboard',
  //       loadChildren: () => import('@pg/main-section/dashboard/dashboard.module').then((m) => m.DashboardModule),
  //     },
  //     {
  //       path: 'table',
  //       title: 'table.parent',
  //       loadChildren: () => import('@pg/main-section/table/table.module').then((m) => m.TableModule),
  //     },
  //     {
  //       path: 'categories',
  //       title: 'category.parent',
  //       loadChildren: () => import('@pg/library-section/category/category.module').then((m) => m.CategoryModule),
  //     },
  //     {
  //       path: 'settings',
  //       title: 'setting.parent',
  //       loadChildren: () => import('@pg/setting/setting.module').then((m) => m.SettingModule),
  //     },
  //   ],
  // },

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

const defaultNavRoutes: INavRoute[] = [];

const navRoutes: { [key: string]: INavRoute[] } = {
  owner: [RestaurantDashboardNavRoute, RestaurantSettingNavRoute],
};

@UntilDestroy()
@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule],
})
export class KeeppackRoutingModule {
  role$: Observable<any>;

  constructor(nav: NavigationService, store: Store) {
    this.role$ = store.select((state) => state.role);
    this.role$.pipe(untilDestroyed(this)).subscribe((val: RoleStateModel) => {
      nav.register(navRoutes[get(val, 'name')] || defaultNavRoutes);
    });
  }
}
