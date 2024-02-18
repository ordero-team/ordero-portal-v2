import { TestBed } from '@angular/core/testing';

import { TableCollection } from './table.collection';

describe('TableCollection', () => {
  let collection: TableCollection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    collection = TestBed.inject(TableCollection);
  });

  it('should be created', () => {
    expect(collection).toBeTruthy();
  });
});
