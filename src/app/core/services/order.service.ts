import { Injectable } from '@angular/core';
import { OrderStatus } from '@app/collections/order.collection';
import { OwnerOrder } from '@app/collections/owner/order.collection';
import { OwnerProfile } from '@app/collections/owner/profile.collection';
import { StaffOrder } from '@app/collections/staff/order.collection';
import { StaffProfile } from '@app/collections/staff/profile.collection';
import { Select } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { OwnerState } from '../states/owner/owner.state';
import { StaffState } from '../states/staff/staff.state';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private orders: BehaviorSubject<OwnerOrder[] | StaffOrder[]> = new BehaviorSubject([]);
  orders$ = this.orders.asObservable();

  @Select(OwnerState.currentUser) owner$: Observable<OwnerProfile>;
  @Select(StaffState.currentUser) staff$: Observable<StaffProfile>;

  constructor() {
    this.owner$.subscribe((user) => {
      if (typeof user === 'undefined') {
        this.orders.next([]);
      }
    });

    this.staff$.subscribe((user) => {
      if (typeof user === 'undefined') {
        this.orders.next([]);
      }
    });
  }

  get count() {
    return this.orders.getValue().length;
  }

  setData(data: OwnerOrder[] | StaffOrder[]) {
    this.orders.next(data);
  }

  add(order: OwnerOrder | StaffOrder) {
    const currentOrders = this.orders.value;
    this.orders.next([order, ...currentOrders]);
  }

  getAll() {
    return this.orders.getValue();
  }

  getByStatus(status: OrderStatus) {
    return this.getAll().filter(({ status: order_status }) => order_status === status) || [];
  }

  find(id: string) {
    return this.getAll().find(({ id: order_id }) => order_id === id) || null;
  }

  updateOrder(orderId: string, updatedOrder: Partial<OwnerOrder | StaffOrder>) {
    const currentOrders = this.orders.value;
    const updatedOrders = currentOrders.map((order) => (order.id === orderId ? { ...order, ...updatedOrder } : order));
    this.orders.next(updatedOrders);
  }
}
