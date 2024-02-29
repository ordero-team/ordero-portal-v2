import { TestBed } from '@angular/core/testing';

import { StaffCollection } from './staff.collection';

describe('StaffCollection', () => {
  let collection: StaffCollection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    collection = TestBed.inject(StaffCollection);
  });

  it('should be created', () => {
    expect(collection).toBeTruthy();
  });
});
