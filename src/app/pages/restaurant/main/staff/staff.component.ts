import { Component, OnInit } from '@angular/core';
import { appIcons } from '@app/core/helpers/icon.helper';
import { INavRoute } from '@app/core/services/navigation.service';
import { StaffListComponent } from './list/list.component';

@Component({
  selector: 'aka-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class RestaurantStaffComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const RestaurantStaffNavRoute: INavRoute = {
  path: 'restaurant/:rid/staff',
  name: 'staff',
  title: 'staff.parent',
  icon: appIcons.outlinePeople,
};

export const RestaurantStaffRoute: INavRoute = {
  ...RestaurantStaffNavRoute,
  path: '',
  component: RestaurantStaffComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      title: 'staff.parent',
      data: { disableScroll: true },
      component: StaffListComponent,
    },
  ],
};
