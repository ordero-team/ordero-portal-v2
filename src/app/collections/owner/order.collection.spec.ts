import { TestBed } from '@angular/core/testing';
import { OwnerOrderCollection } from './order.collection';

describe('OwnerOrderCollection', () => {
  let collection: OwnerOrderCollection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    collection = TestBed.inject(OwnerOrderCollection);
  });

  it('should be created', () => {
    expect(collection).toBeTruthy();
  });
});
