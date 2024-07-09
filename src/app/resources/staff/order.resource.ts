import { Injectable } from '@angular/core';
import { BaseResource, IRestConfigs } from '@lib/resource';
import { StaffRestaurantResource } from './restaurant.resource';

const StaffOrderConfig: IRestConfigs = {
  name: 'staff.order',
  endpoint: 'orders',
  relations: {
    belongsTo: {
      staff_restaurant: {
        parent: true,
        localField: 'staff_restaurant',
        foreignKey: 'restaurant_id',
      },
    },
  },
};

@Injectable({ providedIn: 'root' })
export class StaffOrderResource extends BaseResource {
  constructor(private restaurant: StaffRestaurantResource) {
    super(StaffOrderConfig);
  }
}
