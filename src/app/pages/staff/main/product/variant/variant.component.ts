import { Component, OnInit, ViewChild } from '@angular/core';
import { StaffVariant, StaffVariantCollection } from '@app/collections/staff/variant.collection';
import { INavRoute } from '@app/core/services/navigation.service';
import { StaffAuthService } from '@app/core/services/staff/auth.service';
import { IActionGroup } from '@app/core/states/breadcrumb/breadcrumb.actions';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { MetalQuery } from '@lib/metal-data';
import { MetalQueryRowAction } from '@mtl/components/metal-query/metal-query.component';

@Component({
  selector: 'aka-variant',
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.scss'],
})
export class StaffProductVariantComponent implements OnInit {
  public query: MetalQuery<StaffVariant>;
  public type: StaffVariant;

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

  public rowActions: MetalQueryRowAction<StaffVariant>[] = [
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

  constructor(private collection: StaffVariantCollection, public auth: StaffAuthService) {}

  ngOnInit() {
    this.query = this.collection.query().params({ restaurant_id: this.auth.currentRestaurant.id, include: 'group' });
  }

  onSuccess() {
    this.query.fetch();
    this.createDialog.hide();
  }
}

export const StaffProductVariantNavRoute: INavRoute = {
  path: 'variants',
  name: 'staff.product.variant',
  title: 'product.variant.parent',
};

export const StaffProductVariantRoute: INavRoute = {
  ...StaffProductVariantNavRoute,
  component: StaffProductVariantComponent,
};
