import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table, TableCollection } from '@app/collections/table.collection';
import { CartService } from '@app/core/services/cart.service';
import { INavRoute } from '@app/core/services/navigation.service';
import { ScanTableService } from '@app/core/services/scan-table.service';
import { ToastService } from '@app/core/services/toast.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { has } from 'lodash';

@UntilDestroy()
@Component({
  selector: 'aka-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class CustomerTableComponent implements OnInit {
  table: Table;
  isFetching = true;
  errorMessage = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private collection: TableCollection,
    private toast: ToastService,
    private scanTable: ScanTableService,
    private cart: CartService
  ) {
    this.route.params.pipe(untilDestroyed(this)).subscribe((val) => {
      if (val.table_id) {
        this.check(val.table_id);
      } else {
        router.navigate(['/']);
      }
    });
  }

  ngOnInit() {
    this.scanTable.hide();
  }

  async check(id: string) {
    try {
      this.table = await this.collection.findOne(id, { params: { include: 'restaurant' } });

      setTimeout(() => {
        this.cart.setInfo({ table: this.table, restaurant: null });
        this.router.navigate(['/restaurants', this.table.restaurant.id], { queryParams: { table_id: this.table.id } });
      }, 2000);
    } catch (error) {
      this.table = null;

      if (has(error, 'request.data')) {
        const { message } = error.request.data;
        this.errorMessage = message;
      }

      this.toast.error('Something bad happened', error);
    } finally {
      this.isFetching = false;
    }
  }
}

export const CustomerTableNavRoute: INavRoute = {
  path: 'tables/:table_id',
  name: 'customer.table',
  title: 'customer.parent',
};

export const CustomerTableRoute: INavRoute = {
  ...CustomerTableNavRoute,
  component: CustomerTableComponent,
};
