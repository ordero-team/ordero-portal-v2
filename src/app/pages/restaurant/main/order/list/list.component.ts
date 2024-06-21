import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerOrder, OwnerOrderCollection } from '@app/collections/owner/order.collection';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { ToastService } from '@app/core/services/toast.service';
import { OrderDetailItemsComponent } from '@app/shared/components/order-detail-items/order-detail-items.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'aka-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class OrderListComponent implements OnInit {
  statuses = [
    {
      label: 'All',
      value: '',
    },
    {
      label: 'Waiting Approval',
      value: 'waiting_approval',
    },
    {
      label: 'Confirmed',
      value: 'confirmed',
    },
    {
      label: 'Preparing',
      value: 'preparing',
    },
    {
      label: 'Served',
      value: 'served',
    },
    {
      label: 'Waiting Payment',
      value: 'waiting_payment',
    },
    {
      label: 'Completed',
      value: 'completed',
    },
    {
      label: 'Cancelled',
      value: 'cancelled',
    },
  ];
  selectedStatus = '';

  orders$ = new BehaviorSubject<OwnerOrder[]>([]);
  isFetching = true;

  constructor(
    private collection: OwnerOrderCollection,
    private auth: OwnerAuthService,
    private toast: ToastService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private _bottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {
    this.activeRoute.queryParams.pipe(untilDestroyed(this)).subscribe((val) => {
      let status = '';

      if (val.status) {
        status = val.status;
        this.selectedStatus = status;
      } else {
        this.route.navigate([], {
          relativeTo: this.activeRoute,
          queryParams: { status: '' },
          queryParamsHandling: 'merge',
        });
      }

      this.fetch(status);
    });

    // this.fetch(status);
  }

  onStatusChange(e: MatSelectChange) {
    this.route.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: { status: e.value },
      queryParamsHandling: 'merge',
    });
    // this.fetch(e.value);
  }

  fetch(status = '') {
    this.isFetching = true;
    this.collection
      .find({ params: { restaurant_id: this.auth.currentRestaurant.id, include: 'items,table', status } as any })
      .then((res) => this.orders$.next(res as OwnerOrder[]))
      .catch((error) => this.toast.error('Something bad happened', error))
      .finally(() => (this.isFetching = false));
  }

  isAbleToAction(order: OwnerOrder) {
    return order.status !== 'cancelled';
  }

  showDetail(order: OwnerOrder) {
    this._bottomSheet.open<OrderDetailItemsComponent, OwnerOrder>(OrderDetailItemsComponent, {
      hasBackdrop: true,
      panelClass: ['p-6'],
      data: order,
    });
  }

  async action(order: OwnerOrder, action: string) {
    order.loading = true;
    try {
      await this.collection.update(order.id, { action, restaurant_id: this.auth.currentRestaurant.id } as any);

      const newOrder = await this.collection.findOne(order.id, {
        params: { restaurant_id: this.auth.currentRestaurant.id, include: 'items,table', status } as any,
      });

      this.orders$.next(
        this.orders$.value.map((val) => {
          if (val.id === order.id) {
            return Object.assign({}, { ...newOrder, loading: false });
          }

          return { ...val, loading: false };
        })
      );
    } catch (error) {
      this.toast.error('Something bad hapened', error);
    } finally {
      order.loading = false;
    }
  }
}
