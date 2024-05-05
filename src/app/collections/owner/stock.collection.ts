import { Injectable } from '@angular/core';
import { OwnerOriginService } from '@app/core/services/owner/origin.service';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';
import { OwnerProduct } from './product.collection';
import { OwnerVariant } from './variant.collection';

export interface OwnerStock extends MetalAPIData {
  onhand: number;
  allocated: number;
  available: number;
  sold: number;
  item?: {
    product?: OwnerProduct;
    variant?: OwnerVariant;
  };
}

const StockConfig: MetalCollectionConfig<OwnerStock> = {
  name: 'stock',
  endpointPrefix: 'owner',
  endpoint: 'stocks',
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
export class OwnerStockCollection extends MetalCollection<OwnerStock, OwnerOriginService> {
  constructor(public origin: OwnerOriginService) {
    super(origin, StockConfig);
  }
}
