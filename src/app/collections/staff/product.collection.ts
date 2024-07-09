import { Injectable } from '@angular/core';
import { StaffOriginService } from '@app/core/services/staff/origin.service';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';
import { StaffRestaurantCollection } from './restaurant.collection';

export interface StaffProduct extends MetalAPIData {
  sku: string;
  name: string;
  description: string;
  price: number;

  images?: any[];
  categories?: any[];
  variants?: any[];

  restaurant_id?: string;
}

const ProductConfig: MetalCollectionConfig<StaffProduct> = {
  name: 'product',
  endpointPrefix: 'staff',
  endpoint: 'products',
  relations: {
    belongsTo: [
      {
        name: 'staff.restaurant',
        foreignKey: 'restaurant_id',
      },
    ],
  },
};

@Injectable({
  providedIn: 'root',
})
export class StaffProductCollection extends MetalCollection<StaffProduct, StaffOriginService> {
  constructor(public origin: StaffOriginService, private collection: StaffRestaurantCollection) {
    super(origin, ProductConfig);
  }
}
