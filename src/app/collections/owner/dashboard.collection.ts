import { Injectable } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { OwnerOriginService } from '@app/core/services/owner/origin.service';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';

export interface OwnerDashboard extends MetalAPIData {
  data?: any;

  // Relation
  restaurant_id?: string;
}

const dashboardConfig: MetalCollectionConfig<OwnerDashboard> = {
  name: 'dashboard',
  endpointPrefix: 'owner',
  endpoint: 'dashboard',
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
export class DashboardCollection extends MetalCollection<OwnerDashboard, OwnerOriginService> {
  constructor(public origin: OwnerOriginService, private auth: OwnerAuthService) {
    super(origin, dashboardConfig);
  }

  async total({ start, end, prefix, params }: { start: number; end: number; prefix: string; params?: any }) {
    return this.findOne('', {
      params: { restaurant_id: this.auth.currentRestaurant.id, start, end, ...params },
      suffix: `${prefix}/total`,
    });
  }

  async chart({ start, end, prefix, params }: { start: number; end: number; prefix: string; params?: any }) {
    return this.findOne('', {
      params: { restaurant_id: this.auth.currentRestaurant.id, start, end, ...params },
      suffix: `${prefix}/chart`,
    });
  }
}
