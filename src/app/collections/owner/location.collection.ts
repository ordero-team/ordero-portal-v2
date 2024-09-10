import { Injectable } from '@angular/core';
import { OwnerOriginService } from '@app/core/services/owner/origin.service';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';

export interface OwnerLocation extends MetalAPIData {
  name?: string;
  is_default?: boolean;
  restaurant_id?: string;
}

const LocationConfig: MetalCollectionConfig<OwnerLocation> = {
  name: 'location',
  endpointPrefix: 'owner',
  endpoint: 'locations',
  relations: {
    belongsTo: [
      {
        name: 'owner.restaurant',
        foreignKey: 'restaurant_id',
      },
    ],
  },
};

@Injectable({
  providedIn: 'root',
})
export class OwnerLocationCollection extends MetalCollection<OwnerLocation, OwnerOriginService> {
  constructor(public origin: OwnerOriginService) {
    super(origin, LocationConfig);
  }
}
