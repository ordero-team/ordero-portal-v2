import { Injectable } from '@angular/core';
import { StaffOriginService } from '@app/core/services/staff/origin.service';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';
import { StaffRestaurantCollection } from './restaurant.collection';

export interface StaffVariant extends MetalAPIData {
  name: string;

  location?: any;
  restaurant_id?: string;
}

const VariantConfig: MetalCollectionConfig<StaffVariant> = {
  name: 'staff.variant',
  endpointPrefix: 'staff',
  endpoint: 'variants',
  relations: {
    belongsTo: [
      {
        name: 'staff.restaurant',
        foreignKey: 'restaurant_id',
      },
    ],
  },
};

@Injectable({ providedIn: 'root' })
export class StaffVariantCollection extends MetalCollection<StaffVariant, StaffOriginService> {
  constructor(public origin: StaffOriginService, private restCol: StaffRestaurantCollection) {
    super(origin, VariantConfig);
  }
}
