import { Injectable } from '@angular/core';
import { OwnerOriginService } from '@app/core/services/owner/origin.service';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';
import { OwnerProfile } from './profile.collection';

export interface OwnerRestaurant extends MetalAPIData {
  name: string;
  status: 'active' | 'inactive';
  slug: string;
  phone: string;
  website: string;

  owner?: OwnerProfile;
}

const RestaurantConfig: MetalCollectionConfig<OwnerRestaurant> = {
  name: 'owner.restaurant',
  endpoint: 'restaurants',
};

@Injectable({ providedIn: 'root' })
export class OwnerRestaurantCollection extends MetalCollection<OwnerRestaurant, OwnerOriginService> {
  constructor(public origin: OwnerOriginService) {
    super(origin, RestaurantConfig);
  }
}
