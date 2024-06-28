import { Injectable } from '@angular/core';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';
import { OriginService } from '@mtl/services/origin.service';
import { Restaurant } from './restaurant.collection';

export interface Table extends MetalAPIData {
  number: string;
  status: 'available' | 'in_use' | 'reserved' | 'unavailable';
  location_id: string;

  restaurant?: Restaurant;
}

const TableConfig: MetalCollectionConfig<Table> = {
  name: 'table',
  endpoint: 'customers/tables',
};

@Injectable({ providedIn: 'root' })
export class TableCollection extends MetalCollection<Table, OriginService> {
  constructor(public origin: OriginService) {
    super(origin, TableConfig);
  }
}
