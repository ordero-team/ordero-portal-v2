import { Injectable } from '@angular/core';
import { OwnerOriginService } from '@app/core/services/owner/origin.service';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';

export interface OwnerLocation {
  id?: string;
  name?: string;
}

export interface OwnerProfile extends MetalAPIData {
  email: string;
  name: string;
  avatar?: any;
  role?: {
    id?: string;
    name?: string;
    permissions?: string;
  };
  location?: OwnerLocation;
  status?: string;
  phone?: string;
  address?: any;
  restaurant?: any;
}

const ProfileConfig: MetalCollectionConfig<OwnerProfile> = {
  name: 'profile',
  endpoint: 'owner/me',
};

@Injectable({
  providedIn: 'root',
})
export class OwnerProfileCollection extends MetalCollection<OwnerProfile, OwnerOriginService> {
  constructor(public origin: OwnerOriginService) {
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
