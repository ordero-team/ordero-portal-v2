import { Injectable } from '@angular/core';
import { appIcons } from '@app/core/helpers/icon.helper';
import { OwnerOriginService } from '@app/core/services/owner/origin.service';
import { QueueService } from '@app/core/services/queue.service';
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
  constructor(public origin: OwnerOriginService, private queue: QueueService) {
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
