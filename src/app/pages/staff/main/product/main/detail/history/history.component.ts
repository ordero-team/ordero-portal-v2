import { Component, OnInit } from '@angular/core';
import { INavRoute } from '@app/core/services/navigation.service';

@Component({
  selector: 'aka-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class StaffProductMainDetailHistoryComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const StaffProductMainDetailHistoryNavRoute: INavRoute = {
  path: 'histories',
  name: 'staff.product.main.detail.history',
  title: 'product.main.create.parent',
};

export const StaffProductMainDetailHistoryRoute: INavRoute = {
  ...StaffProductMainDetailHistoryNavRoute,
  component: StaffProductMainDetailHistoryComponent,
};
