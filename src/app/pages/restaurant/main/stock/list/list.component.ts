import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerStock, OwnerStockCollection } from '@app/collections/owner/stock.collection';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { IActionGroup } from '@app/core/states/breadcrumb/breadcrumb.actions';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { MetalQueryRowAction } from '@mtl/components/metal-query/metal-query.component';
import { StockListComponent as TableListing } from '@sc/listing/stock-list/stock-list.component';

@Component({
  selector: 'aka-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class StockListComponent implements OnInit {
  public actionGroup: IActionGroup = [
    [
      {
        icon: 'plusIcon',
        text: 'Create Stock',
        color: 'primary',
        click: () => {
          this.router.navigate(['./create'], { relativeTo: this.active });
        },
      },
    ],
  ];

  public rowActions: MetalQueryRowAction<OwnerStock>[] = [
    {
      icon: 'roundEdit',
      text: 'Edit',
      action: (data) => {
        return () => {
          this.editDialog.show({ title: 'Update Stock', data });
        };
      },
    },
  ];

  @ViewChild('editDialog', { static: true }) editDialog: DialogComponent;
  @ViewChild('tableList', { static: true }) tableList: TableListing;

  constructor(
    private collection: OwnerStockCollection,
    public auth: OwnerAuthService,
    private router: Router,
    private active: ActivatedRoute
  ) {}

  ngOnInit() {}

  onSuccess() {
    this.tableList.query.fetch();
    this.editDialog.hide();
  }
}
