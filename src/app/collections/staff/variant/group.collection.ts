import { Injectable } from '@angular/core';
import { StaffOriginService } from '@app/core/services/staff/origin.service';
import { StaffRestaurantCollection } from '@cl/staff/restaurant.collection';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';

export interface StaffVariantGroup extends MetalAPIData {
  name: string;

  location?: any;
  restaurant_id?: string;
}

const VariantGroupConfig: MetalCollectionConfig<StaffVariantGroup> = {
  name: 'staff.variant.group',
  endpointPrefix: 'staff',
  endpoint: 'variants/groups',
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
export class StaffVariantGroupCollection extends MetalCollection<StaffVariantGroup, StaffOriginService> {
  constructor(public origin: StaffOriginService, private restCol: StaffRestaurantCollection) {
    super(origin, VariantGroupConfig);
  }
}
