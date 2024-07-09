import { TestBed } from '@angular/core/testing';

import { VariantCollection } from './variant.collection';

describe('VariantCollection', () => {
  let collection: VariantCollection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    collection = TestBed.inject(VariantCollection);
  });

  it('should be created', () => {
    expect(collection).toBeTruthy();
  });
});
