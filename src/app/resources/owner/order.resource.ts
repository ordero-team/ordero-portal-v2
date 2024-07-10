import { Injectable } from '@angular/core';
import { OrderStatus } from '@app/collections/order.collection';
import { BaseResource, IRestConfigs } from '@lib/resource';
import { OwnerRestaurantResource } from './restaurant.resource';

export interface Order {
  number: string;
  status: OrderStatus;
}

const OwnerOrderConfig: IRestConfigs = {
  name: 'owner.order',
  endpoint: 'orders',
  relations: {
    belongsTo: {
      restaurant: {
        parent: true,
        localField: 'restaurant',
        foreignKey: 'restaurant_id',
      },
    },
  },
};

@Injectable({ providedIn: 'root' })
export class OwnerOrderResource extends BaseResource {
  constructor(private restaurant: OwnerRestaurantResource) {
    super(OwnerOrderConfig);
  }
}
