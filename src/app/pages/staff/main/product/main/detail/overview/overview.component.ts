import { Component, OnInit } from '@angular/core';
import { INavRoute } from '@app/core/services/navigation.service';

@Component({
  selector: 'aka-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class StaffProductMainDetailOverviewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const StaffProductMainDetailOverviewNavRoute: INavRoute = {
  path: 'overview',
  name: 'staff.product.main.detail.history',
  title: 'product.main.overview.parent',
};

export const StaffProductMainDetailOverviewRoute: INavRoute = {
  ...StaffProductMainDetailOverviewNavRoute,
  component: StaffProductMainDetailOverviewComponent,
};
