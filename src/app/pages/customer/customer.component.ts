import { AkaAnimations } from '@aka/animations';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { CartService, MenuItem } from '@app/core/services/cart.service';
import { INavRoute } from '@app/core/services/navigation.service';
import { ScanTableService } from '@app/core/services/scan-table.service';
import { ScanQrComponent } from '@app/shared/components/customer/scan-qr/scan-qr.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { CustomerCartNavRoute, CustomerCartRoute } from './cart/cart.component';
import { CustomerHomeNavRoute, CustomerHomeRoute } from './home/home.component';
import { OrderNavRoute, OrderRoute } from './order/order.component';
import { CustomerRestaurantNavRoute, CustomerRestaurantRoute } from './restaurant/restaurant.component';
import { CustomerTableNavRoute, CustomerTableRoute } from './table/table.component';

@UntilDestroy()
@Component({
  selector: 'aka-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  animations: AkaAnimations,
})
export class CustomerComponent implements OnInit {
  cartItems: MenuItem[];
  showCart: Observable<boolean>;
  showScanButton: boolean;
  totalPrice: number;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private cart: CartService,
    private scanTable: ScanTableService,
    private router: Router
  ) {}

  ngOnInit() {
    this.scanTable.show();

    this.cart.cartObservable.pipe(untilDestroyed(this)).subscribe((val) => {
      this.cartItems = val;
    });
    this.cart.totalPriceObservable.pipe(untilDestroyed(this)).subscribe((val) => (this.totalPrice = val));
    this.scanTable.isShownObservable.pipe(untilDestroyed(this)).subscribe((val) => (this.showScanButton = val));
    this.showCart = this.cart.isShownObservable;
  }

  openBottomSheet(): void {
    this._bottomSheet.open(ScanQrComponent, {
      hasBackdrop: true,
      panelClass: ['p-4', 'min-w-100'],
    });
  }

  checkOut() {
    this.router.navigate(['/', 'cart']);
  }
}

export const CustomerNavRoute: INavRoute = {
  path: '',
  name: 'customer',
  title: 'customer.parent',
  children: [CustomerHomeNavRoute, CustomerRestaurantNavRoute, CustomerTableNavRoute, CustomerCartNavRoute, OrderNavRoute],
};

export const CustomerRoute: INavRoute = {
  ...CustomerNavRoute,
  component: CustomerComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'home',
    },
    CustomerHomeRoute,
    CustomerRestaurantRoute,
    CustomerTableRoute,
    CustomerCartRoute,
    OrderRoute,
  ],
};
