import { TestBed } from '@angular/core/testing';

import { ProductCollection } from './product.collection';

describe('ProductCollection', () => {
  let collection: ProductCollection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    collection = TestBed.inject(ProductCollection);
  });

  it('should be created', () => {
    expect(collection).toBeTruthy();
  });
});
