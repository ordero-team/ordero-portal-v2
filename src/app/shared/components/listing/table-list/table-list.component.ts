import { Component, Input, OnInit } from '@angular/core';
import { OwnerProfile } from '@app/collections/owner/profile.collection';
import { OwnerTable, OwnerTableCollection } from '@app/collections/owner/table.collection';
import { StaffProfile } from '@app/collections/staff/profile.collection';
import { StaffTable, StaffTableCollection } from '@app/collections/staff/table.collection';
import { MetalQuery } from '@lib/metal-data';
import { MetalQueryBulkAction, MetalQueryRowAction } from '@mtl/components/metal-query/metal-query.component';

@Component({
  selector: 'aka-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent implements OnInit {
  public query: MetalQuery<OwnerTable | StaffTable>;
  public type: OwnerTable | StaffTable;

  @Input()
  rowActions: MetalQueryRowAction<OwnerTable | StaffTable>[] = [];

  @Input()
  bulkActions: MetalQueryBulkAction<OwnerTable | StaffTable>[] = [];

  @Input()
  user: OwnerProfile | StaffProfile = null;

  _isFetching = false;
  @Input()
  get isFetching() {
    return this._isFetching;
  }

  set isFetching(val: boolean) {
    if (val !== this.isFetching) {
      this._isFetching = val;
      this.query.fetch();
      setTimeout(() => {
        this._isFetching = false;
      }, 100);
    }
  }

  constructor(private ownerCol: OwnerTableCollection, private staffCol: StaffTableCollection) {
    // if (!this.user) {
    //   throw new Error(`Require input "user"`);
    // }
  }

  ngOnInit() {
    const params = { include: 'location', restaurant_id: this.user.restaurant.id };

    if (this.user.role.name === 'owner') {
      this.query = this.ownerCol.query().params(params);
    } else {
      this.query = this.staffCol.query().params(params);
    }
  }
}
