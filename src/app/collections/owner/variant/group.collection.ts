import { Injectable } from '@angular/core';
import { OwnerOriginService } from '@app/core/services/owner/origin.service';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';

export type VariantGroupType = 'single' | 'multiple';

export interface OwnerVariantGroup extends MetalAPIData {
  name: string;
  type: VariantGroupType;
  required: boolean;

  location?: any;
  restaurant_id?: string;
}

const VariantGroup: MetalCollectionConfig<OwnerVariantGroup> = {
  name: 'variant.group',
  endpointPrefix: 'owner',
  endpoint: 'variants/groups',
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
export class OwnerVariantGroupCollection extends MetalCollection<OwnerVariantGroup, OwnerOriginService> {
  constructor(public origin: OwnerOriginService) {
    super(origin, VariantGroup);
  }
}
