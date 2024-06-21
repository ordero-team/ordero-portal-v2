import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { OwnerOrder } from '@app/collections/owner/order.collection';

@Component({
  selector: 'aka-order-detail-items',
  templateUrl: './order-detail-items.component.html',
  styleUrls: ['./order-detail-items.component.scss'],
})
export class OrderDetailItemsComponent implements OnInit {
  order: OwnerOrder = null;

  constructor(private _bottomSheetRef: MatBottomSheetRef<OrderDetailItemsComponent>) {}

  ngOnInit() {
    this.order = this._bottomSheetRef.containerInstance.bottomSheetConfig.data || null;
  }
}
