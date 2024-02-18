import { Component, OnInit, ViewChild } from '@angular/core';
import { OwnerTable, OwnerTableCollection } from '@app/collections/owner/table.collection';
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
export class TableListComponent implements OnInit {
  public query: MetalQuery<OwnerTable>;
  public type: OwnerTable;

  public actionGroup: IActionGroup = [
    [
      {
        icon: 'plusIcon',
        text: 'Create Table',
        color: 'primary',
        click: () => {
          this.createDialog.show({ title: 'Create Table', data: null });
        },
      },
    ],
  ];

  public rowActions: MetalQueryRowAction<OwnerTable>[] = [
    {
      icon: 'roundEdit',
      text: 'Edit',
      action: (data) => {
        return () => {
          this.createDialog.show({ title: 'Update Table', data });
        };
      },
    },
  ];

  @ViewChild('createDialog', { static: true }) createDialog: DialogComponent;

  constructor(private collection: OwnerTableCollection, private auth: OwnerAuthService) {}

  ngOnInit() {
    this.query = this.collection.query().params({ restaurant_id: this.auth.currentRestaurant.id, include: '' });
  }

  onSuccess() {
    this.query.fetch();
    this.createDialog.hide();
  }
}
