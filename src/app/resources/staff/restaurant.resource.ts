import { Injectable } from '@angular/core';
import { BaseResource, IRestConfigs } from '@lib/resource';

export const RestaurantConfig: IRestConfigs = {
  name: 'restaurant',
  endpoint: 'staff/restaurants',
};

@Injectable({
  providedIn: 'root',
})
export class RestaurantResource extends BaseResource {
  constructor() {
    super(RestaurantConfig);
  }
}
