import { Component, OnInit, ViewChild } from '@angular/core';
import { OwnerTable, OwnerTableCollection } from '@app/collections/owner/table.collection';
import { StaffAuthService } from '@app/core/services/staff/auth.service';
import { IActionGroup } from '@app/core/states/breadcrumb/breadcrumb.actions';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { MetalQueryBulkAction, MetalQueryRowAction } from '@mtl/components/metal-query/metal-query.component';

@Component({
  selector: 'aka-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class TableListComponent implements OnInit {
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

  public bulkActions: MetalQueryBulkAction<OwnerTable>[] = [
    {
      icon: 'printerIcon',
      text: 'Print Label',
      action: async (event, rows) => {
        await this.collection.printLabel(this.auth.currentRestaurant.id, rows);
      },
    },
  ];

  isFetching = false;

  @ViewChild('createDialog', { static: true }) createDialog: DialogComponent;

  constructor(private collection: OwnerTableCollection, public auth: StaffAuthService) {}

  ngOnInit(): void {}

  onSuccess() {
    this.isFetching = true;
    this.createDialog.hide();
    setTimeout(() => (this.isFetching = false), 100);
  }
}
