import { TestBed } from '@angular/core/testing';

import { RoleCollection } from './role.collection';

describe('RoleCollection', () => {
  let collection: RoleCollection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    collection = TestBed.inject(RoleCollection);
  });

  it('should be created', () => {
    expect(collection).toBeTruthy();
  });
});
