import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { LocationGuardService } from '@app/core/guards/location-guard.service';
import {
  OwnerAuthGuardService,
  OwnerGuestGuardService,
  OwnerVerifiedGuardService,
} from '@app/core/guards/owner-guard.service';
import { RestaurantGuardService } from '@app/core/guards/restaurant-guard.service';
import { StaffGuardService, StaffGuestGuardService } from '@app/core/guards/staff-guard.service';
import { RoleStateModel } from '@app/core/states/role/role.actions';
import { RoleState } from '@app/core/states/role/role.state';
import { EmptyComponent } from '@app/layouts/empty/empty.component';
import { HorizonalLayoutComponent } from '@app/layouts/horizontal/horizontal.component';
import { RestaurantDashboardNavRoute } from '@app/pages/restaurant/main/dashboard/dashboard.component';
import { RestaurantLocationNavRoute } from '@app/pages/restaurant/main/location/location.component';
import { RestaurantOrderNavRoute } from '@app/pages/restaurant/main/order/order.component';
import { RestaurantProductNavRoute } from '@app/pages/restaurant/main/product/product.component';
import { RestaurantSettingNavRoute } from '@app/pages/restaurant/main/setting/setting.component';
import { RestaurantStaffNavRoute } from '@app/pages/restaurant/main/staff/staff.component';
import { RestaurantStockNavRoute } from '@app/pages/restaurant/main/stock/stock.component';
import { RestaurantTableNavRoute } from '@app/pages/restaurant/main/table/table.component';
import { StaffDashboardNavRoute } from '@app/pages/staff/main/dashboard/dashboard.component';
import { StaffOrderNavRoute } from '@app/pages/staff/main/order/order.component';
import { INavMainRoutes, INavRoute, NavigationService } from '@cs/navigation.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { Store } from '@ngxs/store';
import { get } from 'lodash';
import { Observable } from 'rxjs';

const routes: INavMainRoutes = [
  // Landing routes
  {
    path: '',
    title: 'customer.parent',
    component: EmptyComponent,
    loadChildren: () => import('@pg/customer/customer.module').then((m) => m.CustomerModule),
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
    component: HorizonalLayoutComponent,
    loadChildren: () => import('@pg/restaurant/main/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },

  {
    path: 'restaurant/:rid/orders',
    title: 'order.parent',
    canActivate: [OwnerAuthGuardService, OwnerVerifiedGuardService, RestaurantGuardService],
    component: HorizonalLayoutComponent,
    loadChildren: () => import('@pg/restaurant/main/order/order.module').then((m) => m.OrderModule),
  },

  {
    path: 'restaurant/:rid/stocks',
    title: 'stock.parent',
    canActivate: [OwnerAuthGuardService, OwnerVerifiedGuardService, RestaurantGuardService],
    component: HorizonalLayoutComponent,
    loadChildren: () => import('@pg/restaurant/main/stock/stock.module').then((m) => m.StockModule),
  },

  {
    path: 'restaurant/:rid/products',
    title: 'product.parent',
    canActivate: [OwnerAuthGuardService, OwnerVerifiedGuardService, RestaurantGuardService],
    component: HorizonalLayoutComponent,
    loadChildren: () => import('@pg/restaurant/main/product/product.module').then((m) => m.ProductModule),
  },

  {
    path: 'restaurant/:rid/locations',
    title: 'location.parent',
    canActivate: [OwnerAuthGuardService, OwnerVerifiedGuardService, RestaurantGuardService],
    component: HorizonalLayoutComponent,
    loadChildren: () => import('@pg/restaurant/main/location/location.module').then((m) => m.LocationModule),
  },

  {
    path: 'restaurant/:rid/tables',
    title: 'table.parent',
    canActivate: [OwnerAuthGuardService, OwnerVerifiedGuardService, RestaurantGuardService],
    component: HorizonalLayoutComponent,
    loadChildren: () => import('@pg/restaurant/main/table/table.module').then((m) => m.TableModule),
  },

  {
    path: 'restaurant/:rid/staff',
    title: 'staff.parent',
    canActivate: [OwnerAuthGuardService, OwnerVerifiedGuardService, RestaurantGuardService],
    component: HorizonalLayoutComponent,
    loadChildren: () => import('@pg/restaurant/main/staff/staff.module').then((m) => m.StaffModule),
  },

  {
    path: 'restaurant/:rid/settings',
    title: 'setting.parent',
    canActivate: [OwnerAuthGuardService, OwnerVerifiedGuardService, RestaurantGuardService],
    component: HorizonalLayoutComponent,
    loadChildren: () => import('@pg/restaurant/main/setting/setting.module').then((m) => m.SettingModule),
  },

  // Staff routes
  {
    path: 'staff',
    title: '',
    canActivate: [StaffGuestGuardService],
  },

  {
    path: 'staff/auth',
    title: 'auth.parent',
    component: EmptyComponent,
    loadChildren: () => import('@pg/staff/auth/auth.module').then((m) => m.StaffAuthModule),
  },

  {
    path: 'staff/:locid/dashboard',
    title: 'dashboard.parent',
    canActivate: [StaffGuardService, LocationGuardService],
    component: HorizonalLayoutComponent,
    loadChildren: () => import('@pg/staff/main/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },

  {
    path: 'staff/:locid/orders',
    title: 'order.parent',
    canActivate: [StaffGuardService, LocationGuardService],
    component: HorizonalLayoutComponent,
    loadChildren: () => import('@pg/staff/main/order/order.module').then((m) => m.OrderModule),
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
  owner: [
    RestaurantDashboardNavRoute,
    RestaurantOrderNavRoute,
    RestaurantStockNavRoute,
    RestaurantProductNavRoute,
    RestaurantLocationNavRoute,
    RestaurantTableNavRoute,
    RestaurantStaffNavRoute,
    RestaurantSettingNavRoute,
  ],
  cashier: [StaffDashboardNavRoute, StaffOrderNavRoute],
};

@UntilDestroy()
@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig), NgxsStoragePluginModule],
  exports: [RouterModule],
})
export class KeeppackRoutingModule {
  role$: Observable<RoleStateModel> = this.store.select(RoleState.currentRole);

  constructor(nav: NavigationService, private store: Store) {
    this.role$.pipe(untilDestroyed(this)).subscribe((val: RoleStateModel) => {
      nav.register(navRoutes[get(val, 'name')] || defaultNavRoutes);
    });
  }
}
