import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrderCollection } from '@app/collections/order.collection';
import { INavRoute } from '@app/core/services/navigation.service';
import { PubsubService } from '@app/core/services/pubsub.service';
import { Queue, QueueService } from '@app/core/services/queue.service';
import { ScanTableService } from '@app/core/services/scan-table.service';
import { ToastService } from '@app/core/services/toast.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { get, has } from 'lodash';
import { BehaviorSubject } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'aka-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orderId$ = new BehaviorSubject<string>(null);
  order: Order = null;
  isFetching = true;
  isPrinting = false;

  constructor(
    active: ActivatedRoute,
    private router: Router,
    private toast: ToastService,
    private collection: OrderCollection,
    private title: Title,
    private scan: ScanTableService,
    private snackBar: MatSnackBar
  ) {
    active.params.pipe(untilDestroyed(this)).subscribe((val) => {
      if (val.order_id) {
        this.orderId$.next(val.order_id);
      } else {
        this.orderId$.next(null);
      }
    });
  }

  ngOnInit() {
    this.scan.hide();

    this.orderId$.pipe(untilDestroyed(this)).subscribe((val) => {
      const regex = new RegExp('^[0-9A-HJ-KM-NP-TV-Z]{26}$');
      if (!regex.test(val)) {
        this.router.navigate(['/error/not-found']);
        return;
      }

      this.fetch(val);
      PubsubService.getInstance().event(`ordero/${val}/notification`, (data) => {
        if (has(data, 'data')) {
          const order = data.data;
          this.fetch(order.order_id).then(() =>
            this.snackBar.open(`Your order ${this.order.number} has been updated.`, null, { duration: 3000 })
          );
        }
      });

      PubsubService.getInstance().event(`ordero/${val}/event`, (data) => {
        if (has(data, 'payload')) {
          const payload = get(data, 'payload');
          console.log({ url: get(payload, 'body.content', null) });
          this.isPrinting = false;
        }
      });
    });
  }

  async fetch(id: string) {
    this.isFetching = true;
    try {
      this.order = await this.collection.findOne(id, { params: { include: 'items,table' } });
      this.title.setTitle(this.order.number);
    } catch (error) {
      this.toast.error('Something bad happenned', error);
    } finally {
      this.isFetching = false;
    }
  }

  async printBill() {
    try {
      this.isPrinting = true;
      await this.collection.printBill('01J7ECH9NA6HD34KVSFZ2E7CK6', this.order.id);
    } catch (error) {
      this.toast.error('Something bad happenned', error);
    }
  }
}

export const OrderNavRoute: INavRoute = {
  path: 'orders/:order_id',
  name: 'order.detail',
  title: 'order.detail.parent',
};

export const OrderRoute: INavRoute = {
  ...OrderNavRoute,
  component: OrderComponent,
};
