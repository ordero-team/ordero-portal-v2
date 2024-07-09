import { Injectable } from '@angular/core';
import { StaffOriginService } from '@app/core/services/staff/origin.service';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';
import { OwnerRestaurant } from '../owner/restaurant.collection';

export interface StaffLocation {
  id?: string;
  name?: string;
}

export interface StaffProfile extends MetalAPIData {
  email: string;
  name: string;
  avatar?: any;
  role?: {
    id?: string;
    name?: string;
    permissions?: string;
  };
  location?: StaffLocation;
  status?: string;
  phone?: string;
  address?: any;
  restaurant?: OwnerRestaurant;
}

const ProfileConfig: MetalCollectionConfig<StaffProfile> = {
  name: 'profile',
  endpoint: 'staff/me',
};

@Injectable({
  providedIn: 'root',
})
export class StaffProfileCollection extends MetalCollection<StaffProfile, StaffOriginService> {
  constructor(public origin: StaffOriginService) {
    super(origin, ProfileConfig);
  }

  // Verify
  async resendCode() {
    return await this.create(null, { suffix: 'resend-code' });
  }

  async verifyCode(code: string) {
    return await this.create({ code } as any, { suffix: 'verify' });
  }

  async updatePassword(payload: any) {
    return await this.update('', payload, { suffix: 'password' });
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
