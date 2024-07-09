import { Injectable } from '@angular/core';
import { OwnerOriginService } from '@app/core/services/owner/origin.service';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';
import { OwnerVariantGroup } from './variant/group.collection';

export type VariantStatus = 'available' | 'unavailaable';

export interface OwnerVariant extends MetalAPIData {
  name: string;
  status: VariantStatus;
  price: number;

  group?: OwnerVariantGroup;
  location?: any;
  restaurant_id?: string;
}

const VariantConfig: MetalCollectionConfig<OwnerVariant> = {
  name: 'variant',
  endpointPrefix: 'owner',
  endpoint: 'variants',
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
export class OwnerVariantCollection extends MetalCollection<OwnerVariant, OwnerOriginService> {
  constructor(public origin: OwnerOriginService) {
    super(origin, VariantConfig);
  }
}
