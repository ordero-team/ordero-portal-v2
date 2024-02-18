import { TestBed } from '@angular/core/testing';

import { LocationCollection } from './location.collection';

describe('LocationCollection', () => {
  let collection: LocationCollection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    collection = TestBed.inject(LocationCollection);
  });

  it('should be created', () => {
    expect(collection).toBeTruthy();
  });
});
