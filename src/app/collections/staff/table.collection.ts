import { Injectable } from '@angular/core';
import { StaffOriginService } from '@app/core/services/staff/origin.service';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';
import { TableStatus } from '../owner/table.collection';
import { StaffRestaurantCollection } from './restaurant.collection';
import { appIcons } from '@app/core/helpers/icon.helper';
import { QueueService } from '@app/core/services/queue.service';

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
  constructor(public origin: StaffOriginService, private restCol: StaffRestaurantCollection, private queue: QueueService) {
    super(origin, TableConfig);
  }

  async printLabel(restaurant_id: string, data: any[]) {
    const res = (await this.create({ table_ids: data.map((item) => item.id), restaurant_id } as any, {
      suffix: 'label',
    })) as any;

    // Run Queue
    this.queue.start(res.request_id, {
      label: `Generating ${data.length} ${data.length > 1 ? 'Table Labels' : 'Table Label'}`,
      icon: appIcons.outlineDescription,
    });
  }
}
