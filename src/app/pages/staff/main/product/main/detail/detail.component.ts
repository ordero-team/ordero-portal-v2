import { Component, OnInit } from '@angular/core';
import { INavRoute } from '@app/core/services/navigation.service';
import { StaffProductMainDetailHistoryNavRoute, StaffProductMainDetailHistoryRoute } from './history/history.component';
import { StaffProductMainDetailOverviewNavRoute, StaffProductMainDetailOverviewRoute } from './overview/overview.component';
import { ProductSingleResolve } from '@app/collections/staff/product.collection';

@Component({
  selector: 'aka-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class StaffProductMainDetailComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const StaffProductMainDetailNavRoute: INavRoute = {
  path: ':product_id',
  name: 'staff.product.main.detail',
  title: 'product.main.detail.parent',
  children: [StaffProductMainDetailOverviewNavRoute, StaffProductMainDetailHistoryNavRoute],
};

export const StaffProductMainDetailRoute: INavRoute = {
  ...StaffProductMainDetailNavRoute,
  maps: {
    product: ['title', 'sku'],
  },
  resolve: {
    product: ProductSingleResolve,
  },
  runGuardsAndResolvers: 'always',
  component: StaffProductMainDetailComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'overview',
    },
    StaffProductMainDetailOverviewRoute,
    StaffProductMainDetailHistoryRoute,
  ],
};
