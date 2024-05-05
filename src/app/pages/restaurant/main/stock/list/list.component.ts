import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerStock, OwnerStockCollection } from '@app/collections/owner/stock.collection';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { IActionGroup } from '@app/core/states/breadcrumb/breadcrumb.actions';
import { MetalQuery } from '@lib/metal-data';
import { MetalQueryRowAction } from '@mtl/components/metal-query/metal-query.component';

@Component({
  selector: 'aka-stock-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class StockListComponent implements OnInit {
  public query: MetalQuery<OwnerStock>;
  public type: OwnerStock;

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
        return () => {};
      },
    },
  ];

  constructor(
    private collection: OwnerStockCollection,
    private auth: OwnerAuthService,
    private router: Router,
    private active: ActivatedRoute
  ) {}

  ngOnInit() {
    const params = { restaurant_id: this.auth.currentRestaurant.id, include: 'item.product,item.variant' };

    if (this.auth.currentUser.location) {
      Object.assign(params, { location_id: this.auth.currentUser.location.id });
    }

    this.query = this.collection.query().params(params);
  }
}
