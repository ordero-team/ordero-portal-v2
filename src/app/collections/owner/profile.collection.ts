import { Injectable } from '@angular/core';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';
import { OriginService } from '@mtl/services/origin.service';

export interface OwnerProfile extends MetalAPIData {
  email: string;
  name: string;
  avatar?: any;
  role?: {
    id?: string;
    name?: string;
    permissions?: string;
  };
  warehouse?: {
    id?: string;
    name?: string;
  };
  status?: string;
  phone?: string;
  address?: any;
}

const ProfileConfig: MetalCollectionConfig<OwnerProfile> = {
  name: 'profile',
  endpoint: '/owner/me',
};

@Injectable({
  providedIn: 'root',
})
export class OwnerProfileCollection extends MetalCollection<OwnerProfile, OriginService> {
  constructor(public origin: OriginService) {
    super(origin, ProfileConfig);
  }

  updatePassword(payload: any) {
    return this.update('', payload, { suffix: 'password' });
  }

  async updateAvatar(payload: File) {
    const opt = {
      suffix: 'avatar',
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    const formData: FormData = new FormData();
    formData.append('image', payload);

    return await this.create(formData as any, opt);
  }

  async deleteAvatar() {
    return await this.delete('', { suffix: 'avatar' });
  }
}
