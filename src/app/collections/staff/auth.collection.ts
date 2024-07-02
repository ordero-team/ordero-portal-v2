import { Injectable } from '@angular/core';
import { StaffOriginService } from '@app/core/services/staff/origin.service';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';

export interface Auth extends MetalAPIData {
  email: string;
  password: string;
  access_token?: string;
  pubsub_token?: string;
}

const AuthConfig: MetalCollectionConfig<Auth> = {
  name: 'auth',
  endpoint: 'staff/auth',
};

@Injectable({
  providedIn: 'root',
})
export class StaffAuthCollection extends MetalCollection<Auth, StaffOriginService> {
  constructor(public origin: StaffOriginService) {
    super(origin, AuthConfig);
  }

  login(payload: Auth) {
    return this.create(payload, { suffix: 'login' });
  }

  logout() {
    return this.delete(null, { suffix: 'logout' });
  }

  register(payload: any) {
    return this.create(payload, { suffix: 'register' });
  }

  resendVerification(payload: any) {
    return this.create(payload, { suffix: 'verify/resend' });
  }

  verify(token: string) {
    return this.create({} as any, { suffix: `verify/${token}` });
  }

  forgotPassword(payload: any) {
    return this.create(payload, { suffix: 'forgot-password' });
  }

  resetPassword(token: string, payload: any) {
    return this.create({ ...payload, token }, { suffix: `change-password` });
  }
}
