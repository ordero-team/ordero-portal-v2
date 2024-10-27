import { Injectable } from '@angular/core';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';
import { OriginService } from '@mtl/services/origin.service';
import { Table } from './table.collection';
import { QueueService } from '@app/core/services/queue.service';
import { appIcons } from '@app/core/helpers/icon.helper';
import { Restaurant } from './restaurant.collection';

export type OrderStatus =
  | 'waiting_approval'
  | 'confirmed'
  | 'preparing'
  | 'served'
  | 'waiting_payment'
  | 'completed'
  | 'cancelled';

export interface OrderItem {
  id: string;
  qty: number;
  price: number;
  status: string;
  product: OrderItemProduct;
  images: any[];
  variant: any;
}

export interface OrderItemProduct {
  id: string;
  created_at: string;
  updated_at: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  status: string;
}

export interface Order extends MetalAPIData {
  number: string;
  customer_name: string;
  gross_total: string;
  status: OrderStatus;
  table: Table;
  items: OrderItem[];

  restaurant?: Restaurant;
}

const OrderConfig: MetalCollectionConfig<Order> = {
  name: 'order',
  endpoint: 'customers/orders',
};

@Injectable({ providedIn: 'root' })
export class OrderCollection extends MetalCollection<Order, OriginService> {
  constructor(public origin: OriginService, private queue: QueueService) {
    super(origin, OrderConfig);
  }

  async printBill(restaurant_id: string, order_id: string) {
    await this.findOne(order_id, {
      params: { restaurant_id },
      suffix: 'print',
    } as any);
  }
}
