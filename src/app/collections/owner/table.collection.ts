import { Injectable } from '@angular/core';
import { OwnerOriginService } from '@app/core/services/owner/origin.service';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';

export type TableStatus = 'available' | 'in_use' | 'reserved' | 'unavailaable' | 'empty';

export interface OwnerTable extends MetalAPIData {
  number: string;
  status: TableStatus;

  location?: any;
  restaurant_id?: string;
}

const TableConfig: MetalCollectionConfig<OwnerTable> = {
  name: 'table',
  endpointPrefix: 'owner',
  endpoint: 'tables',
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
export class OwnerTableCollection extends MetalCollection<OwnerTable, OwnerOriginService> {
  constructor(public origin: OwnerOriginService) {
    super(origin, TableConfig);
  }
}
