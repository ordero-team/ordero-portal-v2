import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffOrder, StaffOrderCollection } from '@app/collections/staff/order.collection';
import { OrderService } from '@app/core/services/order.service';
import { StaffAuthService } from '@app/core/services/staff/auth.service';
import { ToastService } from '@app/core/services/toast.service';
import { StaffOrderResource } from '@app/resources/staff/order.resource';
import { OrderDetailItemsComponent } from '@app/shared/components/order-detail-items/order-detail-items.component';
import { IRestPagination } from '@lib/resource';
import { untilDestroyed } from '@ngneat/until-destroy';
import { get, has } from 'lodash';

@Component({
  selector: 'aka-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class StaffOrderListComponent implements OnInit, OnDestroy {
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

  // orders$ = new BehaviorSubject<Order[]>([]);
  isFetching = true;
  subscriberPaginate: any;

  // Order Pagination
  currentPage = 1;
  totalCount: number;
  prevEnabled: boolean;
  nextEnabled: boolean;

  constructor(
    public orderService: OrderService,
    private collection: StaffOrderCollection,
    private auth: StaffAuthService,
    private toast: ToastService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private _bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    public orderRes: StaffOrderResource
  ) {}

  ngOnDestroy(): void {
    if (this.subscriberPaginate) {
      this.subscriberPaginate();
    }
  }

  async ngOnInit() {
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

    this.subscriberPaginate = this.orderRes.listUpdated.subscribe((val) => {
      if (val && has(val, 'result.pagination')) {
        const pagination = get(val, 'result.pagination');
        this.generatePaginate(pagination);
      }
    });
  }

  goTo(page: 'next' | 'prev' | number) {
    if (page === 'next') {
      this.currentPage += 1;
      this.fetch(this.selectedStatus);
    } else if (page === 'prev') {
      this.currentPage -= 1;
      this.fetch(this.selectedStatus);
    } else {
      this.currentPage = page;
    }
  }

  generatePaginate(pagination: IRestPagination) {
    const currentPage = pagination.page;
    const xpage = currentPage - 1;
    const totalPages = pagination.page_count;

    this.currentPage = currentPage;
    this.nextEnabled = xpage < totalPages - 1;
    this.prevEnabled = xpage > 0;
    this.totalCount = pagination.total_count;
  }

  onStatusChange(e: MatSelectChange) {
    this.route.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: { status: e.value },
      queryParamsHandling: 'merge',
    });
  }

  fetch(status = '') {
    this.isFetching = true;
    this.orderRes
      .findAll({
        restaurant_id: this.auth.currentRestaurant.id,
        include: 'items,table',
        status,
        per_page: 15,
        sort: '-created_at',
        page: this.currentPage,
      })
      .then((res) => {
        this.orderService.setData(get(res, 'result.data', []) as StaffOrder[]);
      })
      .catch((error) => this.toast.error('Something bad happened', error))
      .finally(() => (this.isFetching = false));
  }

  isAbleToAction(order: StaffOrder) {
    return order.status !== 'cancelled';
  }

  showDetail(order: StaffOrder) {
    this._bottomSheet.open<OrderDetailItemsComponent, StaffOrder>(OrderDetailItemsComponent, {
      hasBackdrop: true,
      panelClass: ['p-6'],
      data: order,
    });
  }

  async action(order: StaffOrder, action: string) {
    order.loading = true;
    try {
      await this.collection.action(order, action);
    } catch (error) {
      this.toast.error('Something bad hapened', error);
    } finally {
      order.loading = false;
    }
  }
}
