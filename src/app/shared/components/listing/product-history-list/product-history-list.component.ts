import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OwnerProduct, OwnerProductCollection } from '@app/collections/owner/product.collection';
import { OwnerProfile } from '@app/collections/owner/profile.collection';
import { StaffProduct, StaffProductCollection } from '@app/collections/staff/product.collection';
import { StaffProfile } from '@app/collections/staff/profile.collection';
import { MetalQuery } from '@lib/metal-data';
import { MetalQueryRowAction, MetalQueryBulkAction } from '@mtl/components/metal-query/metal-query.component';

@Component({
  selector: 'aka-product-history-list',
  templateUrl: './product-history-list.component.html',
  styleUrls: ['./product-history-list.component.scss'],
})
export class ProductHistoryListComponent implements OnInit {
  public query: MetalQuery<OwnerProduct | StaffProduct>;
  public type: OwnerProduct | StaffProduct;

  @Input()
  rowActions: MetalQueryRowAction<OwnerProduct | StaffProduct>[] = [];

  @Input()
  bulkActions: MetalQueryBulkAction<OwnerProduct | StaffProduct>[] = [];

  @Input()
  user: OwnerProfile | StaffProfile = null;

  @Input() product: OwnerProduct | StaffProduct;

  @ViewChild('alertDialog', { static: true }) alertDialog: TemplateRef<any>;

  get isOwner() {
    return this.user.role.name === 'owner';
  }

  constructor(
    private collection: OwnerProductCollection,
    private staffCol: StaffProductCollection,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    const params = { restaurant_id: this.user.restaurant.id };

    if (this.isOwner) {
      this.query = this.collection.query({}, { suffix: `${this.product.id}/histories` }).params(params);
    } else {
      this.query = this.staffCol.query({}, { suffix: `${this.product.id}/histories` }).params(params);
    }
  }

  openDialog(data: any) {
    this.matDialog.open(this.alertDialog, { data: { ...data, action: JSON.parse(data.data) } });
  }
}
