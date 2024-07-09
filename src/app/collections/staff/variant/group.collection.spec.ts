import { TestBed } from '@angular/core/testing';

import { GroupCollection } from './group.collection';

describe('GroupCollection', () => {
  let collection: GroupCollection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    collection = TestBed.inject(GroupCollection);
  });

  it('should be created', () => {
    expect(collection).toBeTruthy();
  });
});
