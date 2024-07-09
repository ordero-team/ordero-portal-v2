import { Component, OnInit } from '@angular/core';
import { INavRoute } from '@app/core/services/navigation.service';
import { StaffProductMainDetailHistoryNavRoute, StaffProductMainDetailHistoryRoute } from './history/history.component';
import { StaffProductMainDetailOverviewComponent } from './overview/overview.component';

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
  children: [StaffProductMainDetailHistoryNavRoute],
};

export const StaffProductMainDetailRoute: INavRoute = {
  ...StaffProductMainDetailNavRoute,
  component: StaffProductMainDetailComponent,
  path: '',
  children: [
    {
      path: '',
      pathMatch: 'full',
      name: 'restaurant.product.main.detail.overview',
      title: 'product.main.parent',
      data: { disableScroll: true },
      component: StaffProductMainDetailOverviewComponent,
    },
    StaffProductMainDetailHistoryRoute,
  ],
};
