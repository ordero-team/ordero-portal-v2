import { TestBed } from '@angular/core/testing';

import { LocationGuardService } from './location-guard.service';

describe('LocationGuardService', () => {
  let service: LocationGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
