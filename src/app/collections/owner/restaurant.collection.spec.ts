import { TestBed } from '@angular/core/testing';
import { OwnerRestaurantCollection } from './restaurant.collection';

describe('OwnerRestaurantCollection', () => {
  let collection: OwnerRestaurantCollection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    collection = TestBed.inject(OwnerRestaurantCollection);
  });

  it('should be created', () => {
    expect(collection).toBeTruthy();
  });
});
