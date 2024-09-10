import { Component, OnInit, ViewChild } from '@angular/core';
import { OwnerTable, OwnerTableCollection } from '@app/collections/owner/table.collection';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { IActionGroup } from '@app/core/states/breadcrumb/breadcrumb.actions';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { MetalQueryBulkAction, MetalQueryRowAction } from '@mtl/components/metal-query/metal-query.component';
import { TableListComponent as TableListing } from '@sc/listing/table-list/table-list.component';

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
    {
      icon: 'printerIcon',
      text: 'Print',
      action: (data) => {
        return async () => {
          await this.collection.printLabel(this.auth.currentRestaurant.id, [data]);
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

  @ViewChild('createDialog', { static: true }) createDialog: DialogComponent;
  @ViewChild('tableList', { static: true }) tableList: TableListing;

  constructor(private collection: OwnerTableCollection, public auth: OwnerAuthService) {}

  ngOnInit() {}

  onSuccess() {
    this.tableList.query.fetch();
    this.createDialog.hide();
  }
}
