import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartInfo, CartService, MenuItem } from '@app/core/services/cart.service';
import { INavRoute } from '@app/core/services/navigation.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'aka-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CustomerCartComponent implements OnInit, OnDestroy {
  info: CartInfo;
  cartItems: MenuItem[];
  totalPrice: number;
  discount = 0;

  constructor(private cart: CartService) {}

  ngOnInit() {
    this.cart.infoObservable.pipe(untilDestroyed(this)).subscribe((val) => (this.info = val));
    this.cart.cartObservable.pipe(untilDestroyed(this)).subscribe((val) => (this.cartItems = val));
    this.cart.totalPriceObservable.pipe(untilDestroyed(this)).subscribe((val) => (this.totalPrice = val));
    this.cart.isShownObservable.pipe(untilDestroyed(this)).subscribe((val) => {
      if (val) {
        this.cart.hide();
      }
    });
  }

  ngOnDestroy() {
    this.cart.show();
  }

  onIncrease(menu: MenuItem) {
    this.cart.addToCart(menu);
    // menu.qty++;
  }

  onDecrease(menu: MenuItem) {
    const item = this.cart.decreaseItemQty(menu);
    menu.qty = item.qty;
  }

  confirmOrder() {
    console.log({ ...this.cart.information, items: this.cart.getCartItems() });
  }
}

export const CustomerCartNavRoute: INavRoute = {
  path: 'cart',
  name: 'customer.cart',
  title: 'customer.cart.parent',
};

export const CustomerCartRoute: INavRoute = {
  ...CustomerCartNavRoute,
  component: CustomerCartComponent,
};
