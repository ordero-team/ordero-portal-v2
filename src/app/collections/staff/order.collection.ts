import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '@app/core/services/order.service';
import { StaffAuthService } from '@app/core/services/staff/auth.service';
import { StaffOriginService } from '@app/core/services/staff/origin.service';
import { ToastService } from '@app/core/services/toast.service';
import { DialogConfirmComponent } from '@app/shared/components/dialog-confirm/dialog-confirm.component';
import { MetalCollection, MetalCollectionConfig } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';
import { capitalize } from 'lodash';
import { OrderStatus } from '../order.collection';
import { OwnerTable } from '../owner/table.collection';
import { StaffRestaurantCollection } from './restaurant.collection';

export interface StaffOrder extends MetalAPIData {
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

const StockConfig: MetalCollectionConfig<StaffOrder> = {
  name: 'staff.order',
  endpointPrefix: 'staff',
  endpoint: 'orders',
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
export class StaffOrderCollection extends MetalCollection<StaffOrder, StaffOriginService> {
  constructor(
    public origin: StaffOriginService,
    private restCol: StaffRestaurantCollection,
    private auth: StaffAuthService,
    private orderService: OrderService,
    private toast: ToastService,
    private dialog: MatDialog
  ) {
    super(origin, StockConfig);
  }

  async fetchOrder(order: StaffOrder): Promise<StaffOrder> {
    const newOrder = await this.findOne(order.id, {
      params: { restaurant_id: this.auth.currentRestaurant.id, include: 'items,table', status } as any,
    });

    this.orderService.updateOrder(order.id, { ...newOrder, loading: false });
    return newOrder;
  }

  async action(order: StaffOrder, action: string, callback?: (order: StaffOrder) => Promise<void>) {
    order.loading = true;
    try {
      let newOrder: StaffOrder = null;

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

  async executeAction(order: StaffOrder, action: string) {
    return await this.update(order.id, { action, restaurant_id: this.auth.currentRestaurant.id } as any);
  }
}
