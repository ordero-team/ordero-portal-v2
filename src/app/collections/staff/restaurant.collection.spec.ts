import { TestBed } from '@angular/core/testing';

import { StaffRestaurantCollection } from './restaurant.collection';

describe('StaffRestaurantCollection', () => {
  let collection: StaffRestaurantCollection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    collection = TestBed.inject(StaffRestaurantCollection);
  });

  it('should be created', () => {
    expect(collection).toBeTruthy();
  });
});
