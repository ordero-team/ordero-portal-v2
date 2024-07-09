import { Component, OnInit, ViewChild } from '@angular/core';
import { StaffCategory, StaffCategoryCollection } from '@app/collections/staff/category.collection';
import { INavRoute } from '@app/core/services/navigation.service';
import { StaffAuthService } from '@app/core/services/staff/auth.service';
import { IActionGroup } from '@app/core/states/breadcrumb/breadcrumb.actions';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { MetalQuery } from '@lib/metal-data';
import { MetalQueryRowAction } from '@mtl/components/metal-query/metal-query.component';

@Component({
  selector: 'aka-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class StaffProductCategoryComponent implements OnInit {
  public query: MetalQuery<StaffCategory>;
  public type: StaffCategory;

  public actionGroup: IActionGroup = [
    [
      {
        icon: 'plusIcon',
        text: 'Create Category',
        color: 'primary',
        click: () => {
          this.createDialog.show({ title: 'Create Category', data: null });
        },
      },
    ],
  ];

  public rowActions: MetalQueryRowAction<StaffCategory>[] = [
    {
      icon: 'roundEdit',
      text: 'Edit',
      action: (data) => {
        return () => {
          this.createDialog.show({ title: 'Update Category', data });
        };
      },
    },
  ];

  @ViewChild('createDialog', { static: true }) createDialog: DialogComponent;

  constructor(private collection: StaffCategoryCollection, public auth: StaffAuthService) {}

  ngOnInit() {
    this.query = this.collection.query().params({ restaurant_id: this.auth.currentRestaurant.id, include: '' });
  }

  onSuccess() {
    this.query.fetch();
    this.createDialog.hide();
  }
}

export const StaffProductCategoryNavRoute: INavRoute = {
  path: 'categories',
  name: 'staff.product.category',
  title: 'product.category.parent',
};

export const StaffProductCategoryRoute: INavRoute = {
  ...StaffProductCategoryNavRoute,
  component: StaffProductCategoryComponent,
};
