import { Injectable } from '@angular/core';
import { Restaurant } from '@app/collections/restaurant.collection';
import { Table } from '@app/collections/table.collection';
import { get } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartInfo {
  restaurant: Restaurant;
  table: Table;
}

export interface MenuItem {
  id: string;
  name: string;
  qty: number;
  price: number;
  variant_id?: string;
  images?: any[];
  stocks?: any[];
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private info: BehaviorSubject<CartInfo> = new BehaviorSubject(null);
  infoObservable: Observable<CartInfo> = this.info.asObservable();

  private cartItems: BehaviorSubject<MenuItem[]> = new BehaviorSubject([]);
  cartObservable: Observable<MenuItem[]> = this.cartItems.asObservable();

  private totalPriceSubject = new BehaviorSubject<number>(0);
  totalPriceObservable = this.totalPriceSubject.asObservable();

  private isShown = new BehaviorSubject<boolean>(false);
  isShownObservable = this.isShown.asObservable();

  constructor() {}

  get shown(): boolean {
    return this.isShown.getValue();
  }

  get information(): CartInfo {
    return this.info.getValue();
  }

  setInfo(data: CartInfo) {
    if (this.info.getValue() === null) {
      this.info.next(data);
    } else if (this.info.getValue().restaurant.id !== data.restaurant.id) {
      throw new Error('Clear your Cart to make another Order from different Restaurant');
    } else if (this.info.getValue().table.id !== data.table.id) {
      throw new Error('Clear your Cart to make another Order from different Restaurant');
    }
  }

  show() {
    this.isShown.next(true);
  }

  hide() {
    this.isShown.next(false);
  }

  addToCart(item: MenuItem): MenuItem {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find((x) =>
      !item.variant_id ? x.id === item.id : x.id === item.id && x.variant_id === item.variant_id
    );

    if (existingItem) {
      existingItem.qty++;
    } else {
      currentItems.push({
        id: item.id,
        name: item.name,
        price: item.price,
        qty: 1,
        variant_id: get(item, 'variant_id', null),
        images: item.images,
      });
    }

    this.cartItems.next(currentItems);
    this.calculateTotalPrice();

    if (!this.shown) {
      this.show();
    }

    return item;
  }

  decreaseItemQty(item: MenuItem): MenuItem {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find((x) =>
      !item.variant_id ? x.id === item.id : x.id === item.id && x.variant_id === item.variant_id
    );

    if (existingItem) {
      if (existingItem.qty > 1) {
        existingItem.qty--;
      } else if (existingItem.qty === 1) {
        existingItem.qty = null;
        this.removeFromCart(existingItem);
      }
    }

    this.cartItems.next(currentItems);
    this.calculateTotalPrice();

    return existingItem;
  }

  removeFromCart(item: MenuItem) {
    const currentItems = this.cartItems.value;
    const itemIndex = currentItems.findIndex((x) =>
      !item.variant_id ? x.id === item.id : x.id === item.id && x.variant_id === item.variant_id
    );

    if (itemIndex !== -1) {
      currentItems.splice(itemIndex, 1);
      this.cartItems.next(currentItems);

      // Check if the cart is empty before hiding
      if (currentItems.length === 0 && this.shown) {
        this.hide();
      }
    }
  }

  clearCart() {
    this.cartItems.next([]);
  }

  calculateTotalPrice() {
    const currentItems = this.cartItems.value;
    const totalPrice = currentItems.reduce((total, item) => total + item.price * item.qty, 0);
    this.totalPriceSubject.next(totalPrice);
  }

  getCartItems(): MenuItem[] {
    return this.cartItems.value;
  }
}
