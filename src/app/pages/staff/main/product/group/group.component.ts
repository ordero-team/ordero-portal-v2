import { Component, OnInit, ViewChild } from '@angular/core';
import { StaffVariantGroup, StaffVariantGroupCollection } from '@app/collections/staff/variant/group.collection';
import { INavRoute } from '@app/core/services/navigation.service';
import { StaffAuthService } from '@app/core/services/staff/auth.service';
import { IActionGroup } from '@app/core/states/breadcrumb/breadcrumb.actions';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { MetalQuery } from '@lib/metal-data';
import { MetalQueryRowAction } from '@mtl/components/metal-query/metal-query.component';

@Component({
  selector: 'aka-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class StaffProductGroupComponent implements OnInit {
  public query: MetalQuery<StaffVariantGroup>;
  public type: StaffVariantGroup;

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

  public rowActions: MetalQueryRowAction<StaffVariantGroup>[] = [
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

  constructor(private collection: StaffVariantGroupCollection, public auth: StaffAuthService) {}

  ngOnInit() {
    this.query = this.collection.query().params({ restaurant_id: this.auth.currentRestaurant.id, include: 'category' });
  }

  onSuccess() {
    this.query.fetch();
    this.createDialog.hide();
  }
}

export const StaffProductGroupNavRoute: INavRoute = {
  path: 'groups',
  name: 'staff.product.group',
  title: 'product.group.parent',
};

export const StaffProductGroupRoute: INavRoute = {
  ...StaffProductGroupNavRoute,
  component: StaffProductGroupComponent,
};
