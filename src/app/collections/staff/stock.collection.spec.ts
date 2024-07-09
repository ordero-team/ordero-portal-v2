import { TestBed } from '@angular/core/testing';

import { StockCollection } from './stock.collection';

describe('StockCollection', () => {
  let collection: StockCollection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    collection = TestBed.inject(StockCollection);
  });

  it('should be created', () => {
    expect(collection).toBeTruthy();
  });
});
