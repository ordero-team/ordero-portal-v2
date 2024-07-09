import { Injectable } from '@angular/core';
import { BaseResource, IRestConfigs } from '@lib/resource';

export const RestaurantConfig: IRestConfigs = {
  name: 'staff_restaurant',
  endpoint: 'staff/restaurants',
};

@Injectable({
  providedIn: 'root',
})
export class StaffRestaurantResource extends BaseResource {
  constructor() {
    super(RestaurantConfig);
  }
}
