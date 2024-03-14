import { Injectable } from '@angular/core';
import { OwnerOriginService } from '@app/core/services/owner/origin.service';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';

export interface OwnerCategory extends MetalAPIData {
  name: string;

  location?: any;
  restaurant_id?: string;
}

const CategoryConfig: MetalCollectionConfig<OwnerCategory> = {
  name: 'category',
  endpointPrefix: 'owner',
  endpoint: 'categories',
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
export class OwnerCategoryCollection extends MetalCollection<OwnerCategory, OwnerOriginService> {
  constructor(public origin: OwnerOriginService) {
    super(origin, CategoryConfig);
  }
}
