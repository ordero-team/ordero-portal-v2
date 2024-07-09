import { TestBed } from '@angular/core/testing';

import { OrderCollection } from './order.collection';

describe('OrderCollection', () => {
  let collection: OrderCollection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    collection = TestBed.inject(OrderCollection);
  });

  it('should be created', () => {
    expect(collection).toBeTruthy();
  });
});
