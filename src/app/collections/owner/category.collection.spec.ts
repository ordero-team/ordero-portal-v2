import { TestBed } from '@angular/core/testing';

import { CategoryCollection } from './category.collection';

describe('CategoryCollection', () => {
  let collection: CategoryCollection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    collection = TestBed.inject(CategoryCollection);
  });

  it('should be created', () => {
    expect(collection).toBeTruthy();
  });
});
