import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { paramsTree } from '@app/core/helpers/route.helper';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
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
  persistentCache: false,
  memoryCache: false,
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
  constructor(public origin: OwnerOriginService, private auth: OwnerAuthService) {
    super(origin, ProductConfig);
  }
}

@Injectable({ providedIn: 'root' })
export class ProductSingleResolve implements Resolve<any> {
  constructor(private collection: OwnerProductCollection, private auth: OwnerAuthService) {}

  public resolve(active: ActivatedRouteSnapshot) {
    const params = paramsTree(active);
    return this.collection.findOne(params.product_id, {
      params: { restaurant_id: this.auth.currentRestaurant.id } as any,
    });
  }
}
