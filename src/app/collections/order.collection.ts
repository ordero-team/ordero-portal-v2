import { Injectable } from '@angular/core';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';
import { OriginService } from '@mtl/services/origin.service';

export type OrderStatus =
  | 'waiting_approval'
  | 'confirmed'
  | 'preparing'
  | 'served'
  | 'waiting_payment'
  | 'completed'
  | 'cancelled';

export interface Order extends MetalAPIData {
  number: string;
  status: OrderStatus;
}

const OrderConfig: MetalCollectionConfig<Order> = {
  name: 'order',
  endpoint: 'customers/orders',
};

@Injectable({ providedIn: 'root' })
export class OrderCollection extends MetalCollection<Order, OriginService> {
  constructor(public origin: OriginService) {
    super(origin, OrderConfig);
  }
}
