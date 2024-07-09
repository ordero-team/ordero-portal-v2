import { Injectable } from '@angular/core';
import { StaffOriginService } from '@app/core/services/staff/origin.service';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';
import { StaffRestaurantCollection } from './restaurant.collection';

export interface StaffStock extends MetalAPIData {
  onhand: number;
  allocated: number;
  available: number;
  sold: number;
  // item?: {
  //   product?: StaffProduct;
  //   variant?: StaffVariant;
  // };
}

const StockConfig: MetalCollectionConfig<StaffStock> = {
  name: 'staff.stock',
  endpointPrefix: 'staff',
  endpoint: 'stocks',
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
export class StaffStockCollection extends MetalCollection<StaffStock, StaffOriginService> {
  constructor(public origin: StaffOriginService, private restCol: StaffRestaurantCollection) {
    super(origin, StockConfig);
  }
}
