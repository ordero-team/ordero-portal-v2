import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { OrderStatus } from '@app/collections/order.collection';
import { OwnerOrder, OwnerOrderCollection } from '@app/collections/owner/order.collection';
import { StaffOrderCollection } from '@app/collections/staff/order.collection';
import { OrderService } from '@app/core/services/order.service';
import { ToastService } from '@app/core/services/toast.service';
import { get } from 'lodash';

@Component({
  selector: 'aka-order-detail-items',
  templateUrl: './order-detail-items.component.html',
  styleUrls: ['./order-detail-items.component.scss'],
})
export class OrderDetailItemsComponent implements OnInit {
  order: OwnerOrder = null;
  isOwner = true;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<OrderDetailItemsComponent>,
    private collection: OwnerOrderCollection,
    private staffCol: StaffOrderCollection,
    private orderService: OrderService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    const orderId = get(this._bottomSheetRef.containerInstance.bottomSheetConfig.data.order, 'id', null);
    if (orderId) {
      this.order = this.orderService.find(orderId);
    }

    this.isOwner = this._bottomSheetRef.containerInstance.bottomSheetConfig.data.isOwner;
  }

  async action(order: OwnerOrder, action: OrderStatus) {
    order.loading = true;
    try {
      if (this.isOwner) {
        await this.collection.action(order, action, async (order) => {
          this.order.status = order.status;
        });
      } else {
        await this.staffCol.action(order, action, async (order) => {
          this.order.status = order.status;
        });
      }
    } catch (error) {
      this.toast.error('Something bad hapened', error);
    } finally {
      order.loading = false;
    }
  }
}
