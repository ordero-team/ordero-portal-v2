import { Injectable } from '@angular/core';
import { StaffOriginService } from '@app/core/services/staff/origin.service';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { OwnerRestaurant } from '../owner/restaurant.collection';

const RestaurantConfig: MetalCollectionConfig<OwnerRestaurant> = {
  name: 'staff.restaurant',
  endpoint: 'restaurants',
};

@Injectable({ providedIn: 'root' })
export class StaffRestaurantCollection extends MetalCollection<OwnerRestaurant, StaffOriginService> {
  constructor(public origin: StaffOriginService) {
    super(origin, RestaurantConfig);
  }
}
