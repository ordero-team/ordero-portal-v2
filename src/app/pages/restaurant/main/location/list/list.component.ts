import { Component, OnInit, ViewChild } from '@angular/core';
import { OwnerLocation, OwnerLocationCollection } from '@app/collections/owner/location.collection';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { IActionGroup } from '@app/core/states/breadcrumb/breadcrumb.actions';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { MetalQuery } from '@lib/metal-data';
import { MetalQueryRowAction } from '@mtl/components/metal-query/metal-query.component';

@Component({
  selector: 'aka-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class LocationListComponent implements OnInit {
  public query: MetalQuery<OwnerLocation>;
  public type: OwnerLocation;

  public actionGroup: IActionGroup = [
    [
      {
        icon: 'plusIcon',
        text: 'Create Location',
        color: 'primary',
        click: () => {
          this.createDialog.show({ title: 'Create Location', data: null });
        },
      },
    ],
  ];

  public rowActions: MetalQueryRowAction<OwnerLocation>[] = [
    {
      icon: 'roundEdit',
      text: 'Edit',
      action: (data) => {
        return () => {
          this.createDialog.show({ title: 'Update Location', data });
        };
      },
    },
  ];

  @ViewChild('createDialog', { static: true }) createDialog: DialogComponent;

  constructor(private collection: OwnerLocationCollection, private auth: OwnerAuthService) {}

  ngOnInit() {
    this.query = this.collection.query().params({ restaurant_id: this.auth.currentRestaurant.id, include: '' });
  }

  onSuccess() {
    this.query.fetch();
    this.createDialog.hide();
  }
}
