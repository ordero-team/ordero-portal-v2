import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { OwnerNotification, OwnerNotificationCollection } from '@app/collections/owner/notification.collection';
import { OwnerOrderCollection } from '@app/collections/owner/order.collection';
import { OwnerLocation } from '@app/collections/owner/profile.collection';
import { NotificationService } from '@app/core/services/notification.service';
import { OrderService } from '@app/core/services/order.service';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { PubsubService } from '@app/core/services/pubsub.service';
import { ToastService } from '@app/core/services/toast.service';
import { OwnerState } from '@app/core/states/owner/owner.state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select } from '@ngxs/store';
import { get, has } from 'lodash';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'notifications',
})
export class NotificationsComponent implements OnInit, OnDestroy {
  @ViewChild('notificationsOrigin') private _notificationsOrigin: MatButton;
  @ViewChild('notificationsPanel') private _notificationsPanel: TemplateRef<any>;

  notifications: any[];

  show = false;
  audio = new Audio();

  get showClearAllButton() {
    return this.service.all.filter((item) => item.show).length > 1;
  }

  @Select(OwnerState.currentLocation) location$: Observable<OwnerLocation>;

  unreadCount = 0;
  private _overlayRef: OverlayRef;

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    public service: NotificationService<OwnerNotification>,
    private orderCol: OwnerOrderCollection,
    private toast: ToastService,
    private auth: OwnerAuthService,
    private orderService: OrderService,
    private notifCol: OwnerNotificationCollection,
    public notifService: NotificationService<OwnerNotification>
  ) {
    this.location$
      .pipe(
        untilDestroyed(this),
        takeWhile((location) => !has(location, 'id'), true)
      )
      .subscribe((location) => {
        if (has(location, 'id')) {
          console.log(`Notification Active for Location ${location.name}`);
          PubsubService.getInstance().event(`ordero/${location.id}/notification`, (data) => {
            this.setNotification(data);
          });
        }
      });

    this.service.notifications.pipe(untilDestroyed(this)).subscribe((val) => {
      this.notifications = val;
    });
  }

  /**
   * On init
   */
  async ngOnInit() {
    this.initAudio();
    const notifications = await this.notifCol.find({
      orderBy: { created_at: 'desc' },
      params: { restaurant_id: this.auth.currentRestaurant.id, sort: '-created_at' } as any,
    });
    this.service.notifications.next(notifications);
    this.unreadCount = notifications.filter((val) => !val.is_read).length;
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Dispose the overlay
    if (this._overlayRef) {
      this._overlayRef.dispose();
    }
  }

  async setNotification(data) {
    await this.service.enqueue({ ...data.data, show: true }, async (notif: OwnerNotification) => {
      if (notif.type === 'order_created') {
        const order = await this.orderCol.findOne(get(data, 'data.order_id'), {
          params: { restaurant_id: this.auth.currentRestaurant.id, include: 'items,table', status } as any,
        });

        if (order) {
          this.orderService.add(order);
          this.toast.info(`New Order ${order.number}`);
          this.audio.load();
          this.audio.play().catch((error) => console.error(error));
          // @TODO: Push to Order state
        }
      }
    });
    // this.store.dispatch(new NotificationAction());

    const interval = setInterval(() => {
      this.service.dequeue();
      clearInterval(interval);
    }, 7000);
  }

  initAudio() {
    this.audio.src = 'assets/audio/notif.wav';
    this.audio.load();
  }

  hidden(notif: any) {
    notif.show = false;
  }

  clearAll() {
    this.service.clear();
  }

  /**
   * Open the notifications panel
   */
  openPanel(): void {
    // Return if the notifications panel or its origin is not defined
    if (!this._notificationsPanel || !this._notificationsOrigin) {
      return;
    }

    // Create the overlay if it doesn't exist
    if (!this._overlayRef) {
      this._createOverlay();
    }

    // Attach the portal to the overlay
    this._overlayRef.attach(new TemplatePortal(this._notificationsPanel, this._viewContainerRef));
  }

  /**
   * Close the messages panel
   */
  closePanel(): void {
    this._overlayRef.detach();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create the overlay
   */
  private _createOverlay(): void {
    // Create the overlay
    this._overlayRef = this._overlay.create({
      hasBackdrop: true,
      backdropClass: 'aka-backdrop-on-mobile',
      scrollStrategy: this._overlay.scrollStrategies.block(),
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(this._notificationsOrigin._elementRef.nativeElement)
        .withLockedPosition()
        .withPush(true)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
          },
          {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom',
          },
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top',
          },
          {
            originX: 'end',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'bottom',
          },
        ]),
    });

    // Detach the overlay from the portal on backdrop click
    this._overlayRef.backdropClick().subscribe(() => {
      this._overlayRef.detach();
    });
  }
}
