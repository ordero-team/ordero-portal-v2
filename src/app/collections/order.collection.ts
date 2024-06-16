import { Injectable } from '@angular/core';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';
import { OriginService } from '@mtl/services/origin.service';

export interface Order extends MetalAPIData {
  number: string;
  status: 'waiting_approval' | 'confirmed' | 'preparing' | 'served' | 'completed' | 'cancelled';
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
