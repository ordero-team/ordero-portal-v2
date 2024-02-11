import { TestBed } from '@angular/core/testing';

import { OwnerGuardGuardService } from './owner-guard.service';

describe('OwnerGuardGuardService', () => {
  let service: OwnerGuardGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerGuardGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
