import { Component, OnInit, ViewChild } from '@angular/core';
import { OwnerStaff, OwnerStaffCollection } from '@app/collections/owner/staff.collection';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { IActionGroup } from '@app/core/states/breadcrumb/breadcrumb.actions';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { MetalQuery } from '@lib/metal-data';
import { MetalQueryRowAction } from '@mtl/components/metal-query/metal-query.component';

@Component({
  selector: 'aka-staff-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class StaffListComponent implements OnInit {
  public query: MetalQuery<OwnerStaff>;
  public type: OwnerStaff;

  public actionGroup: IActionGroup = [
    [
      {
        icon: 'plusIcon',
        text: 'Create Staff',
        color: 'primary',
        click: () => {
          this.createDialog.show({ title: 'Create Staff', data: null });
        },
      },
    ],
  ];

  public rowActions: MetalQueryRowAction<OwnerStaff>[] = [
    {
      icon: 'roundEdit',
      text: 'Edit',
      action: (data) => {
        return () => {
          this.createDialog.show({ title: 'Update Staff', data });
        };
      },
    },
  ];

  @ViewChild('createDialog', { static: true }) createDialog: DialogComponent;

  constructor(private collection: OwnerStaffCollection, private auth: OwnerAuthService) {}

  ngOnInit() {
    this.query = this.collection.query().params({ restaurant_id: this.auth.currentRestaurant.id, include: 'role,location' });
  }

  onSuccess() {
    this.query.fetch();
    this.createDialog.hide();
  }
}
