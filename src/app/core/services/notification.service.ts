import { Injectable } from '@angular/core';
import { OwnerProfile } from '@app/collections/owner/profile.collection';
import { Select } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { OwnerState } from '../states/owner/owner.state';

@Injectable({ providedIn: 'platform' })
export class NotificationService<T> {
  public notifications: BehaviorSubject<T[]> = new BehaviorSubject([]);

  @Select(OwnerState.currentUser) user$: Observable<OwnerProfile>;

  constructor() {
    // User Logout, Clear All Pusher States
    this.user$.subscribe((user) => {
      if (typeof user === 'undefined') {
        this.clear();
      }
    });
  }

  get all(): T[] {
    return this.notifications.value;
  }

  get countUnread(): number {
    return this.notifications.value.filter((val: any) => !val.is_read).length;
  }

  public get(id: string) {
    return this.all.find((item: any) => item.id === id);
  }

  public enqueue(notif: T, cb?: (notif: T) => Promise<void>) {
    const currentNotifications = this.notifications.value;

    if (this.get((notif as any).id)) {
      return;
    }

    currentNotifications.push(notif);
    this.notifications.next(currentNotifications);

    if (cb) {
      cb(notif);
    }

    return this.get((notif as any).id);
  }

  public dequeue() {
    return this.notifications.getValue().shift();
  }

  public peek() {
    if (this.all?.length) {
      return this.all[0];
    } else {
      return undefined;
    }
  }

  public clear(): void {
    this.notifications.next([]);
  }
}

export class Notification {
  id?: string;
  // type: INotificationType;
  type: any;
  title: string;
  content?: string;
  actor: string;
  is_read: boolean;
  show?: boolean;
  order_id?: string;

  constructor({ id, type, title, content, actor, is_read, show = true, order_id = null }: any) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.content = content;
    this.actor = actor;
    this.is_read = is_read;
    this.show = show;
    this.order_id = order_id;
  }
}
