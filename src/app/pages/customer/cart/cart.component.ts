import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderCollection } from '@app/collections/order.collection';
import { CartInfo, CartService, MenuItem } from '@app/core/services/cart.service';
import { INavRoute } from '@app/core/services/navigation.service';
import { ToastService } from '@app/core/services/toast.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { get } from 'lodash';

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

  customerName: string = null;
  customerPhone: string = null;

  isFetching = false;

  constructor(
    private cart: CartService,
    private orderCol: OrderCollection,
    private toast: ToastService,
    private router: Router
  ) {}

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

  async confirmOrder() {
    this.isFetching = true;
    try {
      const payload = {
        restaurant_id: get(this.info, 'restaurant.id', null),
        table_id: get(this.info, 'table.id', null),
        customer_name: this.customerName,
        customer_phone: this.customerPhone,
        products: this.cart
          .getCartItems()
          .map((val) => ({ id: val.id, qty: val.qty, price: val.price, variant_id: val.variant_id })),
      };
      const res = await this.orderCol.create(payload as any);

      this.toast.info(`Order ${res.number} successfully created`);
      this.router.navigate(['/orders', res.id]);
    } catch (error) {
      this.toast.error('Something bad happened', error);
    } finally {
      this.isFetching = false;
    }
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
