import { Injectable } from '@angular/core';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';
import { OriginService } from '@mtl/services/origin.service';

export interface Restaurant extends MetalAPIData {
  name: string;
  phone?: string;
  description?: string;
  website?: string;
  slug?: string;
  email?: string;
  status: 'active' | 'inactive';
  logo_url?: string;
  banner_url?: string;
}

const RestaurantConfig: MetalCollectionConfig<Restaurant> = {
  name: 'restaurant',
  endpoint: 'restaurants',
};

@Injectable({ providedIn: 'root' })
export class RestaurantCollection extends MetalCollection<Restaurant, OriginService> {
  constructor(public origin: OriginService) {
    super(origin, RestaurantConfig);
  }

  async getMenus(restaurantId: string): Promise<any> {
    return await this.find(
      {},
      { suffix: `${restaurantId}/menus`, params: { include: 'images,categories,variants.variant' } }
    );
  }
}
