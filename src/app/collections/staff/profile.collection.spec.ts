import { TestBed } from '@angular/core/testing';

import { ProfileCollection } from './profile.collection';

describe('ProfileCollection', () => {
  let collection: ProfileCollection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    collection = TestBed.inject(ProfileCollection);
  });

  it('should be created', () => {
    expect(collection).toBeTruthy();
  });
});
