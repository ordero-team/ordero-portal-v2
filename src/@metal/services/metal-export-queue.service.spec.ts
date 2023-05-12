import { TestBed } from '@angular/core/testing';

import { MetalExportQueueService } from './metal-export-queue.service';

describe('MetalExportQueueService', () => {
  let service: MetalExportQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetalExportQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
