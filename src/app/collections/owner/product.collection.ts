import { Injectable } from '@angular/core';
import { OwnerOriginService } from '@app/core/services/owner/origin.service';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';

export interface OwnerProduct extends MetalAPIData {
  sku: string;
  name: string;
  description: string;
  price: number;

  images?: any[];
  categories?: any[];
  variants?: any[];

  restaurant_id?: string;
}

const ProductConfig: MetalCollectionConfig<OwnerProduct> = {
  name: 'product',
  endpointPrefix: 'owner',
  endpoint: 'products',
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
export class OwnerProductCollection extends MetalCollection<OwnerProduct, OwnerOriginService> {
  constructor(public origin: OwnerOriginService) {
    super(origin, ProductConfig);
  }
}
