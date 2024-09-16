import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '@app/core/services/order.service';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { OwnerOriginService } from '@app/core/services/owner/origin.service';
import { ToastService } from '@app/core/services/toast.service';
import { DialogConfirmComponent } from '@app/shared/components/dialog-confirm/dialog-confirm.component';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';
import { capitalize } from 'lodash';
import { OrderStatus } from '../order.collection';
import { OwnerTable } from './table.collection';
import { QueueService } from '@app/core/services/queue.service';
import { appIcons } from '@app/core/helpers/icon.helper';

export interface OwnerOrder extends MetalAPIData {
  number: string;
  status: OrderStatus;
  gross_total: number;
  discount: number;
  billed_at: string;
  note: string;
  customer_name?: string;
  customer_phone?: string;
  items?: any[];
  table?: OwnerTable;

  restaurant_id?: string;
  loading?: boolean;
}

const OrderConfig: MetalCollectionConfig<OwnerOrder> = {
  name: 'order',
  endpointPrefix: 'owner',
  endpoint: 'orders',
  relations: {
    belongsTo: [
      {
        name: 'owner.restaurant',
        foreignKey: 'restaurant_id',
      },
    ],
  },
};

@Injectable({ providedIn: 'root' })
export class OwnerOrderCollection extends MetalCollection<OwnerOrder, OwnerOriginService> {
  constructor(
    public origin: OwnerOriginService,
    private toast: ToastService,
    private orderService: OrderService,
    private dialog: MatDialog,
    private auth: OwnerAuthService,
    private queue: QueueService
  ) {
    super(origin, OrderConfig);
  }

  async fetchOrder(order: OwnerOrder): Promise<OwnerOrder> {
    const newOrder = await this.findOne(order.id, {
      params: { restaurant_id: this.auth.currentRestaurant.id, include: 'items,table', status } as any,
    });

    this.orderService.updateOrder(order.id, { ...newOrder, loading: false });
    return newOrder;
  }

  async action(order: OwnerOrder, action: string, callback?: (order: OwnerOrder) => Promise<void>) {
    order.loading = true;
    try {
      let newOrder: OwnerOrder = null;

      if (action !== 'completed') {
        await this.executeAction(order, action);
        newOrder = await this.fetchOrder(order);
        if (callback) {
          await callback(newOrder);
        }
        this.toast.info(`Order ${order.number} has been successfully set to ${capitalize(action)}`);
      } else {
        const delRef = this.dialog.open(DialogConfirmComponent, {
          data: {
            title: `Confirm Payment`,
            message: `Are you sure to confirm payment of <b>${order.number}</b>?`,
            showConfirm: true,
            confirmLabel: 'Confirm',
            showWarning: false,
            class: 'min-w-60',
          },
        });

        delRef.afterClosed().subscribe(async (result) => {
          if (result) {
            try {
              await this.executeAction(order, action);
              newOrder = await this.fetchOrder(order);
              if (callback) {
                await callback(newOrder);
              }
              this.toast.info(`Order ${order.number} has been successfully set to ${capitalize(action)}`);
            } catch (error) {
              this.toast.error({ title: 'Error', detail: 'Something went wrong' }, error);
            }
          }
        });
      }
    } catch (error) {
      this.toast.error('Something bad hapened', error);
    } finally {
      order.loading = false;
    }
  }

  async executeAction(order: OwnerOrder, action: string) {
    return await this.update(order.id, { action, restaurant_id: this.auth.currentRestaurant.id } as any);
  }

  async export({ restaurant_id, status, search }: { restaurant_id: string; status: string; search: string }) {
    const res = (await this.findOne('', {
      params: { restaurant_id, status, search },
      suffix: 'export',
    } as any)) as any;

    // Run Queue
    this.queue.start(res.request_id, {
      label: `Generating Orders...`,
      icon: appIcons.outlineDescription,
    });
  }
}
