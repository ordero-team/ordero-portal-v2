import { Injectable } from '@angular/core';
import { StaffOriginService } from '@app/core/services/staff/origin.service';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';
import { StaffRestaurantCollection } from './restaurant.collection';

export interface StaffCategory extends MetalAPIData {
  name: string;

  location?: any;
  restaurant_id?: string;
}

const CategoryConfig: MetalCollectionConfig<StaffCategory> = {
  name: 'staff.category',
  endpointPrefix: 'staff',
  endpoint: 'categories',
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
export class StaffCategoryCollection extends MetalCollection<StaffCategory, StaffOriginService> {
  constructor(public origin: StaffOriginService, private restCol: StaffRestaurantCollection) {
    super(origin, CategoryConfig);
  }
}
