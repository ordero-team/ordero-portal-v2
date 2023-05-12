import { Injectable } from '@angular/core';
import { MetalQueueStatus } from '@lib/metal-data';

export interface MetalExportQueue {
  label: string;
  progress: number;
  status: MetalQueueStatus;
}

@Injectable({
  providedIn: 'root',
})
export class MetalExportQueueService {
  public queues: MetalExportQueue[] = [];

  public get completed() {
    return this.queues.filter((q) => q.status === 'complete');
  }

  public add(queue: MetalExportQueue): void {
    this.queues.push(queue);
  }

  public rem(queue: MetalExportQueue): void {
    this.queues.splice(this.queues.indexOf(queue), 1);
  }

  public clear(): void {
    this.queues = [];
  }
}
