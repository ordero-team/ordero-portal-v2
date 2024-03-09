import { Injectable } from '@angular/core';
import { OwnerOriginService } from '@app/core/services/owner/origin.service';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';

export interface OwnerStaff extends MetalAPIData {
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'blocked';

  role?: any;
  location?: any;
  restaurant_id?: string;
}

const StaffConfig: MetalCollectionConfig<OwnerStaff> = {
  name: 'staff',
  endpointPrefix: 'owner',
  endpoint: 'staff',
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
export class OwnerStaffCollection extends MetalCollection<OwnerStaff, OwnerOriginService> {
  constructor(public origin: OwnerOriginService) {
    super(origin, StaffConfig);
  }
}
