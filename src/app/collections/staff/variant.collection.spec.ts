import { TestBed } from '@angular/core/testing';

import { StaffVariantCollection } from './variant.collection';

describe('StaffVariantCollection', () => {
  let collection: StaffVariantCollection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    collection = TestBed.inject(StaffVariantCollection);
  });

  it('should be created', () => {
    expect(collection).toBeTruthy();
  });
});
