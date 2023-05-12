import { TestBed, inject } from '@angular/core/testing';

import { ClipboardService } from './clipboard.service';
import { ToastService } from './toast.service';

describe('ClipboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClipboardService, ToastService],
    });
  });

  it('should be created', inject([ClipboardService], (service: ClipboardService) => {
    expect(service).toBeTruthy();
  }));
});
