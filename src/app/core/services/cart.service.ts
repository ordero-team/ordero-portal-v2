import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface MenuItem {
  id: string;
  qty: number;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: BehaviorSubject<MenuItem[]> = new BehaviorSubject([]);
  cartObservable: Observable<MenuItem[]> = this.cartItems.asObservable();

  private totalPriceSubject = new BehaviorSubject<number>(0);
  totalPriceObservable = this.totalPriceSubject.asObservable();

  constructor() {}

  addToCart(item: MenuItem): MenuItem {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find((x) => x.id === item.id);

    if (existingItem) {
      existingItem.qty++;
    } else {
      currentItems.push({ ...item, qty: 1 });
    }

    this.cartItems.next(currentItems);
    this.calculateTotalPrice();

    return item;
  }

  decreaseItemQty(item: MenuItem): MenuItem {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find((x) => x.id === item.id);

    if (existingItem && existingItem.qty > 1) {
      existingItem.qty--;
    } else if (existingItem && existingItem.qty === 1) {
      existingItem.qty = null;
      this.removeFromCart(existingItem);
    }

    this.cartItems.next(currentItems);
    this.calculateTotalPrice();

    return existingItem;
  }

  removeFromCart(item: MenuItem) {
    const currentItems = this.cartItems.value;
    const itemIndex = currentItems.findIndex((x) => x.id === item.id);

    if (itemIndex !== -1) {
      currentItems.splice(itemIndex, 1);
      this.cartItems.next(currentItems);
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
