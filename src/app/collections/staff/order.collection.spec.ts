import { TestBed } from '@angular/core/testing';

import { StaffOrderCollection } from './order.collection';

describe('StaffOrderCollection', () => {
  let collection: StaffOrderCollection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    collection = TestBed.inject(StaffOrderCollection);
  });

  it('should be created', () => {
    expect(collection).toBeTruthy();
  });
});
