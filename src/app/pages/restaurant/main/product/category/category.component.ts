import { Component, OnInit, ViewChild } from '@angular/core';
import { OwnerCategory, OwnerCategoryCollection } from '@app/collections/owner/category.collection';
import { INavRoute } from '@app/core/services/navigation.service';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { IActionGroup } from '@app/core/states/breadcrumb/breadcrumb.actions';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { MetalQuery } from '@lib/metal-data';
import { MetalQueryRowAction } from '@mtl/components/metal-query/metal-query.component';

@Component({
  selector: 'aka-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class RestaurantProductCategoryComponent implements OnInit {
  public query: MetalQuery<OwnerCategory>;
  public type: OwnerCategory;

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

  public rowActions: MetalQueryRowAction<OwnerCategory>[] = [
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

  constructor(private collection: OwnerCategoryCollection, private auth: OwnerAuthService) {}

  ngOnInit() {
    this.query = this.collection.query().params({ restaurant_id: this.auth.currentRestaurant.id, include: '' });
  }

  onSuccess() {
    this.query.fetch();
    this.createDialog.hide();
  }
}

export const RestaurantProductCategoryNavRoute: INavRoute = {
  path: 'categories',
  name: 'restaurant.product.category',
  title: 'product.category.parent',
};

export const RestaurantProductCategoryRoute: INavRoute = {
  ...RestaurantProductCategoryNavRoute,
  component: RestaurantProductCategoryComponent,
};
