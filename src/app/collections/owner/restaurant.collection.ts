import { Injectable } from '@angular/core';
import { OwnerOriginService } from '@app/core/services/owner/origin.service';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';
import { OwnerProfile } from './profile.collection';

export interface Restaurant extends MetalAPIData {
  name: string;
  status: 'active' | 'inactive';
  slug: string;

  owner?: OwnerProfile;
}

const RestaurantConfig: MetalCollectionConfig<Restaurant> = {
  name: 'owner.restaurant',
  endpoint: 'restaurants',
};

@Injectable({ providedIn: 'root' })
export class OwnerRestaurantCollection extends MetalCollection<Restaurant, OwnerOriginService> {
  constructor(public origin: OwnerOriginService) {
    super(origin, RestaurantConfig);
  }
}
