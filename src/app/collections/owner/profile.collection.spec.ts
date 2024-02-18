import { TestBed } from '@angular/core/testing';

import { OwnerProfileCollection } from './profile.collection';

describe('OwnerProfileCollection', () => {
  let collection: OwnerProfileCollection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    collection = TestBed.inject(OwnerProfileCollection);
  });

  it('should be created', () => {
    expect(collection).toBeTruthy();
  });
});
