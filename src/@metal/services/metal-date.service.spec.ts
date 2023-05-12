import { TestBed } from '@angular/core/testing';

import { MetalDateService } from './metal-date.service';

describe('MetalDateService', () => {
  let service: MetalDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetalDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
