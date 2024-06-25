import { Injectable } from '@angular/core';
import { OwnerOriginService } from '@app/core/services/owner/origin.service';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';
import { OrderStatus } from '../order.collection';

export interface OwnerOrder extends MetalAPIData {
  number: string;
  status: OrderStatus;
  gross_total: number;
  discount: number;
  billed_at: string;
  note: string;
  customer_name?: string;
  customer_phone?: string;
  items?: any[];

  restaurant_id?: string;
  loading?: boolean;
}

const OrderConfig: MetalCollectionConfig<OwnerOrder> = {
  name: 'order',
  endpointPrefix: 'owner',
  endpoint: 'orders',
  relations: {
    belongsTo: [
      {
        name: 'owner.restaurant',
        foreignKey: 'restaurant_id',
      },
    ],
  },
};

@Injectable({ providedIn: 'root' })
export class OwnerOrderCollection extends MetalCollection<OwnerOrder, OwnerOriginService> {
  constructor(public origin: OwnerOriginService) {
    super(origin, OrderConfig);
  }
}
