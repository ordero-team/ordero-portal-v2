import { Injectable } from '@angular/core';
import { OwnerOriginService } from '@app/core/services/owner/origin.service';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';
import { OwnerProfile } from './profile.collection';

export interface OwnerRestaurant extends MetalAPIData {
  name: string;
  status: 'active' | 'inactive';
  slug: string;
  phone: string;
  website: string;
  logo_url?: string;
  banner_url?: string;

  owner?: OwnerProfile;
}

const RestaurantConfig: MetalCollectionConfig<OwnerRestaurant> = {
  name: 'owner.restaurant',
  endpoint: 'restaurants',
};

@Injectable({ providedIn: 'root' })
export class OwnerRestaurantCollection extends MetalCollection<OwnerRestaurant, OwnerOriginService> {
  constructor(public origin: OwnerOriginService) {
    super(origin, RestaurantConfig);
  }

  async updateAvatar(type: 'logo' | 'banner', payload: File) {
    const opt = {
      prefix: 'owner',
      suffix: `image/${type}`,
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    const formData: FormData = new FormData();
    formData.append('image', payload);

    return await this.create(formData as any, opt);
  }

  async deleteAvatar(type: 'logo' | 'banner') {
    return await this.delete('', { suffix: `image/${type}`, prefix: 'owner' });
  }
}
