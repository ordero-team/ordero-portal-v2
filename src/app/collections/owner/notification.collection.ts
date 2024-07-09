import { Injectable } from '@angular/core';
import { OwnerOriginService } from '@app/core/services/owner/origin.service';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';

export type OwnerNotificationType = 'order_created' | 'order_updated';

export interface OwnerNotification extends MetalAPIData {
  title: string;
  content: string;
  type: OwnerNotificationType;
  is_read: boolean;
  show?: boolean;
  restaurant_id?: string;
  location_id?: string;
  order_id?: string;
}

const NotificationConfig: MetalCollectionConfig<OwnerNotification> = {
  name: 'notification',
  endpointPrefix: 'owner',
  endpoint: 'notifications',
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
export class OwnerNotificationCollection extends MetalCollection<OwnerNotification, OwnerOriginService> {
  constructor(public origin: OwnerOriginService) {
    super(origin, NotificationConfig);
  }
}
