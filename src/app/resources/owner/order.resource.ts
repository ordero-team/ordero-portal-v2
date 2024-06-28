import { Injectable } from '@angular/core';
import { OrderStatus } from '@app/collections/order.collection';
import { BaseResource, IRestConfigs } from '@lib/resource';
import { RestaurantResource } from './restaurant.resource';

export interface Order {
  number: string;
  status: OrderStatus;
}

const OwnerOrderConfig: IRestConfigs = {
  name: 'owner_order',
  endpoint: 'orders',
  relations: {
    belongsTo: {
      restaurant: {
        parent: true,
        localField: 'owner.restaurant',
        foreignKey: 'restaurant_id',
      },
    },
  },
};

@Injectable({ providedIn: 'root' })
export class OwnerOrderResource extends BaseResource {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(restaurant: RestaurantResource) {
    super(OwnerOrderConfig);
  }
}
