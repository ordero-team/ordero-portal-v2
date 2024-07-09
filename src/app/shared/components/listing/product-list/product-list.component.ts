import { Component, Input, OnInit } from '@angular/core';
import { OwnerProduct, OwnerProductCollection } from '@app/collections/owner/product.collection';
import { OwnerProfile } from '@app/collections/owner/profile.collection';
import { StaffProduct, StaffProductCollection } from '@app/collections/staff/product.collection';
import { StaffProfile } from '@app/collections/staff/profile.collection';
import { MetalQuery } from '@lib/metal-data';
import { MetalQueryBulkAction, MetalQueryRowAction } from '@mtl/components/metal-query/metal-query.component';

@Component({
  selector: 'aka-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  public query: MetalQuery<OwnerProduct | StaffProduct>;
  public type: OwnerProduct | StaffProduct;

  @Input()
  rowActions: MetalQueryRowAction<OwnerProduct | StaffProduct>[] = [];

  @Input()
  bulkActions: MetalQueryBulkAction<OwnerProduct | StaffProduct>[] = [];

  @Input()
  user: OwnerProfile | StaffProfile = null;

  get isOwner() {
    return this.user.role.name === 'owner';
  }

  constructor(private collection: OwnerProductCollection, private staffCol: StaffProductCollection) {}

  ngOnInit(): void {
    const params = { restaurant_id: this.user.restaurant.id, include: 'variants,categories,images' };

    if (this.isOwner) {
      this.query = this.collection.query().params(params);
    } else {
      this.query = this.staffCol.query().params(params);
    }
  }
}
