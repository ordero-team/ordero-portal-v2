import { Component, Input, OnInit } from '@angular/core';
import { OwnerProfile } from '@app/collections/owner/profile.collection';
import { OwnerStock, OwnerStockCollection } from '@app/collections/owner/stock.collection';
import { StaffProfile } from '@app/collections/staff/profile.collection';
import { StaffStock, StaffStockCollection } from '@app/collections/staff/stock.collection';
import { MetalQuery } from '@lib/metal-data';
import { MetalQueryBulkAction, MetalQueryRowAction } from '@mtl/components/metal-query/metal-query.component';

@Component({
  selector: 'aka-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss'],
})
export class StockListComponent implements OnInit {
  public query: MetalQuery<OwnerStock | StaffStock>;
  public type: OwnerStock | StaffStock;

  @Input()
  rowActions: MetalQueryRowAction<OwnerStock | StaffStock>[] = [];

  @Input()
  bulkActions: MetalQueryBulkAction<OwnerStock | StaffStock>[] = [];

  @Input()
  user: OwnerProfile | StaffProfile = null;

  constructor(private ownerCol: OwnerStockCollection, private staffCol: StaffStockCollection) {
    // if (!this.user) {
    //   throw new Error(`Require input "user"`);
    // }
  }

  ngOnInit() {
    const params = { restaurant_id: this.user.restaurant.id, include: 'item.product,item.variant,location' };

    if (this.user.role.name === 'owner') {
      if (this.user.location) {
        Object.assign(params, { location_id: this.user.location.id });
      }

      this.query = this.ownerCol.query().params(params);
    } else {
      this.query = this.staffCol.query().params(params);
    }
  }
}
