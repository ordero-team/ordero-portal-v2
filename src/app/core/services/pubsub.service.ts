import { Injectable } from '@angular/core';
import { Profile } from '@app/collections/profile.collection';
import { AuthState } from '@ct/auth/auth.state';
import { environment } from '@env/environment';
import { Select } from '@ngxs/store';
import { Centrifuge, PublicationContext, TransportEndpoint } from 'centrifuge';
import { Observable } from 'rxjs';
import * as SocketIo from 'socket.io-client';

export enum PubSubEvent {
  Event = 'event',
  Notification = 'notification',
}

export enum PubSubEventType {
  OwnerCreateStock = 'owner_create_stock',
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

export type PubsubType = SocketIo.Socket | Centrifuge;

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
      case 'socketio': {
        this.socket = SocketIo.io(environment.socketUrl, { transports: ['websocket'], upgrade: false });
        break;
      }
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
  }

  public static getInstance(): PubsubService {
    return this._instance || (this._instance = new this());
  }

  emit(channelName: string, data: any, callback?: (data: any) => void) {
    let socket: PubsubType;
    switch (environment.socketType) {
      case 'socketio': {
        socket = this.socket as SocketIo.Socket;
        socket.emit(channelName, data);
        break;
      }
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
      case 'socketio': {
        socket = this.socket as SocketIo.Socket;
        socket.connect();
        socket.on(channelName, (data: IPubSubEventData) => callback(data));

        socket.on('connect', () => {
          console.log('Socket connected');
        });

        socket.on('connect_error', (error) => {
          console.log('Socket connection error', error);
        });
        break;
      }
      case 'centrifugo': {
        socket = this.socket as Centrifuge;
        if (socket) {
          const sub = socket.newSubscription(channelName);

          sub.on('publication', ({ data }: PublicationContext) => {
            callback(data);
          });

          sub.subscribe();
          socket.connect();

          socket.on('error', (error) => {
            console.log(`Error Pubsub`, error);
          });
        }
        break;
      }
    }
  }

  connect() {
    let socket: PubsubType;
    switch (environment.socketType) {
      case 'socketio': {
        socket = this.socket as SocketIo.Socket;
        socket.connect();

        socket.on('connect', () => {
          console.log('Socket connected');
        });

        socket.on('connect_error', (error) => {
          console.log('Socket connection error', error);
        });
        break;
      }
      case 'centrifugo': {
        socket = this.socket as Centrifuge;
        if (socket) {
          socket.connect();

          socket.on('error', (error) => {
            console.log(`Error Pubsub`, error);
          });
        }
        break;
      }
    }
  }

  disconnect() {
    let socket: PubsubType;
    switch (environment.socketType) {
      case 'socketio': {
        socket = this.socket as SocketIo.Socket;
        socket.removeAllListeners();
        socket.disconnect();
        break;
      }
      case 'centrifugo': {
        socket = this.socket as Centrifuge;
        if (socket) {
          socket.disconnect();
        }
        break;
      }
    }
  }
}
