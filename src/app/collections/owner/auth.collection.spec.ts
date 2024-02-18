import { TestBed } from '@angular/core/testing';

import { OwnerAuthCollection } from './auth.collection';

describe('OwnerAuthCollection', () => {
  let collection: OwnerAuthCollection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    collection = TestBed.inject(OwnerAuthCollection);
  });

  it('should be created', () => {
    expect(collection).toBeTruthy();
  });
});
