import { AkaAnimations } from '@aka/animations';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CartService, MenuItem } from '@app/core/services/cart.service';
import { INavRoute } from '@app/core/services/navigation.service';
import { ScanQrComponent } from '@app/shared/components/customer/scan-qr/scan-qr.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CustomerHomeNavRoute, CustomerHomeRoute } from './home/home.component';
import { CustomerRestaurantNavRoute, CustomerRestaurantRoute } from './restaurant/restaurant.component';

@UntilDestroy()
@Component({
  selector: 'aka-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  animations: AkaAnimations,
})
export class CustomerComponent implements OnInit {
  cartItems: MenuItem[];
  totalPrice: number;

  constructor(private _bottomSheet: MatBottomSheet, private cart: CartService) {}

  ngOnInit() {
    this.cart.cartObservable.pipe(untilDestroyed(this)).subscribe((val) => {
      this.cartItems = val;
    });
    this.cart.totalPriceObservable.pipe(untilDestroyed(this)).subscribe((val) => (this.totalPrice = val));
  }

  openBottomSheet(): void {
    this._bottomSheet.open(ScanQrComponent, {
      hasBackdrop: true,
      panelClass: ['p-4', 'min-w-100'],
    });
  }

  checkOut() {
    console.log(this.cart.getCartItems());
  }
}

export const CustomerNavRoute: INavRoute = {
  path: '',
  name: 'customer',
  title: 'customer.parent',
  children: [CustomerHomeNavRoute, CustomerRestaurantNavRoute],
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
  ],
};
