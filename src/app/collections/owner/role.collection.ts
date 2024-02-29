import { Injectable } from '@angular/core';
import { OwnerOriginService } from '@app/core/services/owner/origin.service';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';

export interface OwnerStaffRole extends MetalAPIData {
  name: string;
  location?: any;
  restaurant_id?: string;
}

const StaffRoleConfig: MetalCollectionConfig<OwnerStaffRole> = {
  name: 'role',
  endpointPrefix: 'owner',
  endpoint: 'staff/roles',
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
export class OwnerStaffRoleCollection extends MetalCollection<OwnerStaffRole, OwnerOriginService> {
  constructor(public origin: OwnerOriginService) {
    super(origin, StaffRoleConfig);
  }
}
