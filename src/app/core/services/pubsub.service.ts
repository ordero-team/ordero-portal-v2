import { Injectable } from '@angular/core';
import { Profile } from '@app/collections/profile.collection';
import { AuthState } from '@ct/auth/auth.state';
import { environment } from '@env/environment';
import { Select } from '@ngxs/store';
import { Centrifuge, PublicationContext, TransportEndpoint } from 'centrifuge';
import { Observable } from 'rxjs';

export enum PubSubEvent {
  Event = 'event',
  Notification = 'notification',
}

export enum PubSubEventType {
  ImportMarketProduct = 'import_market_product',
  SyncMarketProduct = 'sync_market_product',
  SyncMarketStock = 'sync_market_stock',
  ImportMarketOrder = 'import_market_order',
  SyncMarketOrder = 'sync_market_order',
  RequestBulkOutbound = 'request_bulk_outbound',
  ImportOutbound = 'import_outbound',
  GetProductLabel = 'get_product_label',
  GetInboundLabel = 'get_inbound_label',
  GetOutboundLabel = 'get_onbound_label',

  StaffCreateRack = 'staff_create_rack',
  StaffGetProductLabel = 'staff_get_product_label',
  StaffGetBinLabel = 'staff_get_bin_label',
  StaffGetLocationLabel = 'staff_get_location_label',
  StaffGetManifest = 'staff_get_manifest',
  StaffGetInboundLabel = 'staff_get_inbound_label',
  StaffGetOutboundLabel = 'staff_get_outbound_label',
}

export enum PubSubStatus {
  Success = 'success',
  Fail = 'fail',
  Warning = 'warning',
}

export enum PubSubPayloadType {
  Dialog = 'dialog',
  Download = 'download',
}

interface IPubSubEventData {
  request_id: string;
  status: PubSubStatus;
  type: PubSubEventType;
  payload?: {
    type: PubSubPayloadType;
    body: any;
  };
  error?: string;
}

export type PubsubType = Centrifuge;

@Injectable({ providedIn: 'root' })
export class PubsubService {
  private static _instance: PubsubService;
  private socket: PubsubType;

  @Select(AuthState.currentUser) private user$: Observable<Profile>;
  @Select(AuthState.pubsubToken) private pubsubToken$: Observable<string>;

  constructor() {
    if (PubsubService._instance) {
      throw new Error('Error: Instantiation failed: Use Pusher.getInstance() instead of new');
    }

    switch (environment.socketType) {
      case 'centrifugo': {
        this.pubsubToken$.subscribe((token) => {
          if (token) {
            const transports: TransportEndpoint[] = [
              {
                transport: 'websocket',
                endpoint: environment.centrifugoUrl,
              },
            ];
            this.socket = new Centrifuge(transports, {
              token,
            });
          } else {
            this.socket = null;
          }
        });
        break;
      }
    }

    // User Logout, Clear All Pusher States
    this.user$.subscribe((user) => {
      if (typeof user === 'undefined') {
        let socket: PubsubType;
        switch (environment.socketType) {
          case 'centrifugo': {
            socket = this.socket as Centrifuge;
            if (socket) {
              socket.disconnect();
            }
            break;
          }
        }
      }
    });
  }

  public static getInstance(): PubsubService {
    return this._instance || (this._instance = new this());
  }

  emit(channelName: string, data: any, callback?: (data: any) => void) {
    let socket: PubsubType;
    switch (environment.socketType) {
      case 'centrifugo': {
        socket = this.socket as Centrifuge;
        if (socket) {
          socket.emit('publication', { channel: channelName, data });
          callback && callback(data);
        }
        break;
      }
    }
  }

  event(channelName: string, callback: (data: IPubSubEventData | PublicationContext) => void) {
    let socket: PubsubType;
    switch (environment.socketType) {
      case 'centrifugo': {
        socket = this.socket as Centrifuge;
        if (socket) {
          const sub = socket.newSubscription(channelName);

          sub.on('publication', ({ data }: PublicationContext) => {
            callback(data);
          });

          sub.subscribe();
          socket.connect();

          socket.on('connected', (ctx) => console.log('Connected', ctx));

          socket.on('error', (error) => {
            console.log(`Error Pubsub`, error);
          });
        }
        break;
      }
    }
  }
}
