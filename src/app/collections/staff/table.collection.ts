import { Injectable } from '@angular/core';
import { StaffOriginService } from '@app/core/services/staff/origin.service';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';
import { TableStatus } from '../owner/table.collection';
import { StaffRestaurantCollection } from './restaurant.collection';

export interface StaffTable extends MetalAPIData {
  number: string;
  status: TableStatus;

  restaurant_id?: string;
  loading?: boolean;
}

const TableConfig: MetalCollectionConfig<StaffTable> = {
  name: 'staff.table',
  endpointPrefix: 'staff',
  endpoint: 'tables',
  relations: {
    belongsTo: [
      {
        name: 'staff.restaurant',
        foreignKey: 'restaurant_id',
      },
    ],
  },
};

@Injectable({ providedIn: 'root' })
export class StaffTableCollection extends MetalCollection<StaffTable, StaffOriginService> {
  constructor(public origin: StaffOriginService, private restCol: StaffRestaurantCollection) {
    super(origin, TableConfig);
  }
}
