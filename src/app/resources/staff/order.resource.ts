import { Injectable } from '@angular/core';
import { BaseResource, IRestConfigs } from '@lib/resource';
import { RestaurantResource } from './restaurant.resource';

const StaffOrderConfig: IRestConfigs = {
  name: 'staff_order',
  endpoint: 'orders',
  relations: {
    belongsTo: {
      restaurant: {
        parent: true,
        localField: 'staff.restaurant',
        foreignKey: 'restaurant_id',
      },
    },
  },
};

@Injectable({ providedIn: 'root' })
export class StaffOrderResource extends BaseResource {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(restaurant: RestaurantResource) {
    super(StaffOrderConfig);
  }
}
