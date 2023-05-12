import { EventEmitter } from '@lib/event';

class RequestTrackerClass {
  onHttpStart: EventEmitter = new EventEmitter();
  onHttpFinish: EventEmitter = new EventEmitter();
  onHttpErrors: EventEmitter = new EventEmitter();
}

export const RequestTracker = new RequestTrackerClass();
