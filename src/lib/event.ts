export type TEventHandler = (...args: any[]) => void;
export type TUnsubscriber = () => void;

export class EventEmitter {
  listeners: TEventHandler[] = [];

  emit(...args: any[]): void {
    if (Array.isArray(this.listeners) && Array.isArray(args)) {
      for (const handler of this.listeners) {
        if (typeof handler === 'function') {
          handler(...args);
        }
      }
    }
  }

  subscribe(handler: TEventHandler): TUnsubscriber {
    if (Array.isArray(this.listeners)) {
      if (typeof handler === 'function' && !this.listeners.includes(handler)) {
        this.listeners.push(handler);
        return () => this.unsubscribe(handler);
      }
    }
  }

  unsubscribe(handler: TEventHandler): void {
    if (Array.isArray(this.listeners)) {
      this.listeners.splice(this.listeners.indexOf(handler), 1);
    }
  }
}
