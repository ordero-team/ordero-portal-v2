import { TestBed } from '@angular/core/testing';

import { RestaurantResource } from './restaurant.resource';

describe('RestaurantResource', () => {
  let resource: RestaurantResource;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resource = TestBed.inject(RestaurantResource);
  });

  it('should be created', () => {
    expect(resource).toBeTruthy();
  });
});
