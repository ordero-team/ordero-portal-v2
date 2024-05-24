import { TestBed } from '@angular/core/testing';

import { RestaurantCollection } from './restaurant.collection';

describe('RestaurantCollection', () => {
  let collection: RestaurantCollection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    collection = TestBed.inject(RestaurantCollection);
  });

  it('should be created', () => {
    expect(collection).toBeTruthy();
  });
});
