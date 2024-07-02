import { TestBed } from '@angular/core/testing';

import { OwnerOriginService } from './origin.service';

describe('OwnerOriginService', () => {
  let service: OwnerOriginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerOriginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
