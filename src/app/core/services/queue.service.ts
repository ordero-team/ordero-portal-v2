import { Injectable } from '@angular/core';
import { appIcons } from '@ch/icon.helper';
import { Profile } from '@cl/profile.collection';
import { AuthState } from '@ct/auth/auth.state';
import { Select } from '@ngxs/store';
import { Icon } from '@visurel/iconify-angular';
import * as $ from 'lodash';
import { EventEmitter } from '@lib/event';
import { Observable } from 'rxjs';

export interface IQueueData {
  request_id: string;
  status: 'success' | 'fail' | 'warning';
  type: string;
  payload?: {
    type: 'dialog' | 'download';
    body: any;
  };
  error?: string;
}

/**
 * Queue Interface contains properties to display the Queue information on the
 * popup.
 */
export interface IQueue {
  label?: string;
  avatar?: string;
  icon?: string | Icon;
  data?: IQueueData;
  cancelable?: boolean;
  actionBtn?: IQueueAction;
  payload?: any;
}

export interface IQueueAction {
  label: string;
  icon: string;
  click: (q: IQueue) => any;
}

type IQueueStatus = 'queued' | 'started' | 'cancelled' | 'failed' | 'finished' | 'warning';

const queueIcons = {
  queued: appIcons.baselineAccessAlarm,
  started: appIcons.baselineAlarmOn,
  cancelled: appIcons.baselineAlarmOff,
  failed: appIcons.twotoneCancel,
  finished: appIcons.twotoneCheckCircle,
};

/**
 * Queue Service
 *
 * A service to manage Queues {@class Queue}. Queues are displayed as a popup at bottom-right.
 * Queues will be automatically updated by UserChannel from Pusher.
 *
 * @example
 *
 * class Component {
 *   constructor(private queue: QueueService, private resource: UserResource) {}
 *
 *   async bulkDelete() {
 *     const {id} = await this.resource.bulkdDelete();
 *     const queue = this.queue.create(id, {
 *       label: 'Test',
 *       icon: 'info'
 *     });
 *     queue.onFinish.subscribe(async() => {
 *       await this.resource.refresh()
 *     });
 *   }
 * }
 */
@Injectable({
  providedIn: 'platform',
})
export class QueueService {
  public queues: Queue[] = [];

  @Select(AuthState.currentUser) user$: Observable<Profile>;

  constructor() {
    // User Logout, Clear All Pusher States
    this.user$.subscribe((user) => {
      if (typeof user === 'undefined') {
        this.clear();
      }
    });
  }

  get allDone(): boolean {
    return this.finished.length === this.queues.length;
  }

  get queued(): Queue[] {
    return this.queues.filter((queue) => queue.status === 'queued');
  }

  get started(): Queue[] {
    return this.queues.filter((queue) => queue.status === 'started');
  }

  get cancelled(): Queue[] {
    return this.queues.filter((queue) => queue.status === 'cancelled');
  }

  get finished(): Queue[] {
    return this.queues.filter((queue) => queue.status === 'finished');
  }

  get failed(): Queue[] {
    return this.queues.filter((queue) => queue.status === 'failed');
  }

  get warning(): Queue[] {
    return this.queues.filter((queue) => queue.status === 'warning');
  }

  public get(id: string): Queue {
    for (const queue of this.queues) {
      if (queue.id === id) {
        return queue;
      }
    }
  }

  public status(id: string, status: IQueueStatus) {
    const queue = this.get(id);

    if (queue) {
      queue.status = status;
    }
  }

  /**
   * Create a new Queue and display it.
   * @param id Queue ID given by the API response.
   * @param configs Queue data to be displayed.
   */
  public create(id: string, configs: IQueue): Queue {
    this.queues.push(new Queue(id, configs));
    return this.get(id);
  }

  /**
   * Create new Queue and start it.
   * @param id Queue ID given by the API response.
   * @param configs Queue data to be displayed.
   */
  public start(id: string, configs?: IQueue): Queue {
    if (configs) {
      this.queues.push(new Queue(id, configs, 'started'));
    } else {
      this.status(id, 'started');
    }

    return this.get(id);
  }

  /**
   * Mark a queue as finished.
   * @param id
   */
  public finish(id: string): void {
    this.status(id, 'finished');
  }

  /**
   * Mark a queue as failed.
   * @param id
   */
  public fail(id: string): void {
    this.status(id, 'failed');
  }

  /**
   * Mark a queue as cancelled.
   * @param id
   */
  public cancel(id: string): void {
    this.status(id, 'cancelled');
  }

  /**
   * Remove all queues and close the popup.
   */
  public clear(): void {
    this.queues = [];
  }
}

/**
 * A Queue object that hold queue data to be displayed.
 */
export class Queue {
  /** An event emitter that will be triggered when the queue finished. */
  public onFinish = new EventEmitter();
  /** An event emitter that will be triggered when the queue warning. */
  public onWarning = new EventEmitter();
  /** An event emitter that will be triggered when the queue failed. */
  public onFailed = new EventEmitter();

  public status: IQueueStatus = 'queued';

  get icon(): string | Icon {
    return queueIcons[this.status] || appIcons.baselineAddAlarm;
  }

  /**
   * @constructor
   * @param id A Queue ID given by the API response.
   * @param configs A Queue configs contains the queue data.
   * @param status An initial status of the queue.
   */
  constructor(public id: string, public configs: IQueue, status?: IQueueStatus) {
    if (status) {
      this.status = status;
    }
  }

  /**
   * Merge new configs into the existing configs.
   * @param configs
   */
  public update(configs: IQueue): Queue {
    $.merge(this.configs, configs);
    return this;
  }

  /** Change the queue status to started */
  public start(): Queue {
    this.status = 'started';
    return this;
  }

  /** Change the queue status to finished */
  public finish(): Queue {
    this.status = 'finished';
    this.onFinish.emit();
    return this;
  }

  /** Change the queue status to failed */
  public fail(payload: IQueue): Queue {
    this.status = 'failed';
    this.onFailed.emit(payload);
    return this;
  }

  /** Change the queue status to cancelled */
  public cancel(): Queue {
    this.status = 'cancelled';
    return this;
  }

  /** Change the queue status to warning */
  public warning(payload: IQueue): Queue {
    this.status = 'warning';
    this.onWarning.emit(payload);
    return this;
  }
}
