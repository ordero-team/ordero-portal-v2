import { Injectable } from '@angular/core';
import { BaseResource, IRestConfigs } from '@lib/resource';

export const RestaurantConfig: IRestConfigs = {
  name: 'restaurant',
  endpoint: 'owner/restaurants',
};

@Injectable({
  providedIn: 'root',
})
export class OwnerRestaurantResource extends BaseResource {
  constructor() {
    super(RestaurantConfig);
  }
}
