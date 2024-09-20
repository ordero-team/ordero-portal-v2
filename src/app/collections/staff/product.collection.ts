import { Injectable } from '@angular/core';
import { StaffOriginService } from '@app/core/services/staff/origin.service';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';
import { StaffRestaurantCollection } from './restaurant.collection';
import { StaffAuthService } from '@app/core/services/staff/auth.service';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { paramsTree } from '@app/core/helpers/route.helper';

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
  persistentCache: false,
  memoryCache: false,
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

@Injectable({ providedIn: 'root' })
export class ProductSingleResolve implements Resolve<any> {
  constructor(private collection: StaffProductCollection, private auth: StaffAuthService) {}

  public resolve(active: ActivatedRouteSnapshot) {
    const params = paramsTree(active);
    return this.collection.findOne(params.product_id, {
      params: { restaurant_id: this.auth.currentRestaurant.id } as any,
    });
  }
}
