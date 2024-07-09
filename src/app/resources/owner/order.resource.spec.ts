import { TestBed } from '@angular/core/testing';

import { OrderResource } from './order.resource';

describe('OrderResource', () => {
  let resource: OrderResource;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resource = TestBed.inject(OrderResource);
  });

  it('should be created', () => {
    expect(resource).toBeTruthy();
  });
});
