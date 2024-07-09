import { Component, OnInit } from '@angular/core';
import { appIcons } from '@app/core/helpers/icon.helper';
import { INavRoute } from '@app/core/services/navigation.service';
import { StaffProductMainNavRoute, StaffProductMainRoute } from './main/main.component';

@Component({
  selector: 'aka-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class StaffProductComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const StaffProductNavRoute: INavRoute = {
  path: 'staff/:locid/products',
  name: 'staff.product',
  title: 'product.parent',
  icon: appIcons.foodOutline,
  children: [
    StaffProductMainNavRoute,
    {
      type: 'divider',
    },
    // StaffProductCategoryNavRoute,
    // StaffProductGroupNavRoute,
    // StaffProductVariantNavRoute,
  ],
};

export const StaffProductRoute: INavRoute = {
  ...StaffProductNavRoute,
  path: '',
  component: StaffProductComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'main',
    },
    StaffProductMainRoute,
    // StaffProductCategoryRoute,
    // StaffProductGroupRoute,
    // StaffProductVariantRoute,
  ],
};
