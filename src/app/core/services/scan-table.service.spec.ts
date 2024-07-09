import { TestBed } from '@angular/core/testing';

import { ScanTableService } from './scan-table.service';

describe('ScanTableService', () => {
  let service: ScanTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScanTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
