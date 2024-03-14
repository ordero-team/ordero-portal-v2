import { Component, OnInit, ViewChild } from '@angular/core';
import { OwnerVariant, OwnerVariantCollection } from '@app/collections/owner/variant.collection';
import { INavRoute } from '@app/core/services/navigation.service';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { IActionGroup } from '@app/core/states/breadcrumb/breadcrumb.actions';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { MetalQuery } from '@lib/metal-data';
import { MetalQueryRowAction } from '@mtl/components/metal-query/metal-query.component';

@Component({
  selector: 'aka-variant',
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.scss'],
})
export class RestaurantProductVariantComponent implements OnInit {
  public query: MetalQuery<OwnerVariant>;
  public type: OwnerVariant;

  public actionGroup: IActionGroup = [
    [
      {
        icon: 'plusIcon',
        text: 'Create Variant',
        color: 'primary',
        click: () => {
          this.createDialog.show({ title: 'Create Variant', data: null });
        },
      },
    ],
  ];

  public rowActions: MetalQueryRowAction<OwnerVariant>[] = [
    {
      icon: 'roundEdit',
      text: 'Edit',
      action: (data) => {
        return () => {
          this.createDialog.show({ title: 'Update Variant', data });
        };
      },
    },
  ];

  @ViewChild('createDialog', { static: true }) createDialog: DialogComponent;

  constructor(private collection: OwnerVariantCollection, private auth: OwnerAuthService) {}

  ngOnInit() {
    this.query = this.collection.query().params({ restaurant_id: this.auth.currentRestaurant.id, include: 'group' });
  }

  onSuccess() {
    this.query.fetch();
    this.createDialog.hide();
  }
}

export const RestaurantProductVariantNavRoute: INavRoute = {
  path: 'variants',
  name: 'restaurant.product.variant',
  title: 'product.variant.parent',
};

export const RestaurantProductVariantRoute: INavRoute = {
  ...RestaurantProductVariantNavRoute,
  component: RestaurantProductVariantComponent,
};
