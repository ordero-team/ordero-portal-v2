import { Component, OnInit, ViewChild } from '@angular/core';
import { OwnerVariantGroup, OwnerVariantGroupCollection } from '@app/collections/owner/variant/group.collection';
import { INavRoute } from '@app/core/services/navigation.service';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { IActionGroup } from '@app/core/states/breadcrumb/breadcrumb.actions';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { MetalQuery } from '@lib/metal-data';
import { MetalQueryRowAction } from '@mtl/components/metal-query/metal-query.component';

@Component({
  selector: 'aka-product-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class RestaurantProductGroupComponent implements OnInit {
  public query: MetalQuery<OwnerVariantGroup>;
  public type: OwnerVariantGroup;

  public actionGroup: IActionGroup = [
    [
      {
        icon: 'plusIcon',
        text: 'Create Variant Group',
        color: 'primary',
        click: () => {
          this.createDialog.show({ title: 'Create Variant Group', data: null });
        },
      },
    ],
  ];

  public rowActions: MetalQueryRowAction<OwnerVariantGroup>[] = [
    {
      icon: 'roundEdit',
      text: 'Edit',
      action: (data) => {
        return () => {
          this.createDialog.show({ title: 'Update Variant Group', data });
        };
      },
    },
  ];

  @ViewChild('createDialog', { static: true }) createDialog: DialogComponent;

  constructor(private collection: OwnerVariantGroupCollection, public auth: OwnerAuthService) {}

  ngOnInit() {
    this.query = this.collection.query().params({ restaurant_id: this.auth.currentRestaurant.id, include: 'category' });
  }

  onSuccess() {
    this.query.fetch();
    this.createDialog.hide();
  }
}

export const RestaurantProductGroupNavRoute: INavRoute = {
  path: 'groups',
  name: 'restaurant.product.group',
  title: 'product.group.parent',
};

export const RestaurantProductGroupRoute: INavRoute = {
  ...RestaurantProductGroupNavRoute,
  component: RestaurantProductGroupComponent,
};
