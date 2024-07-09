import { TestBed } from '@angular/core/testing';

import { StaffTableCollection } from './table.collection';

describe('StaffTableCollection', () => {
  let collection: StaffTableCollection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    collection = TestBed.inject(StaffTableCollection);
  });

  it('should be created', () => {
    expect(collection).toBeTruthy();
  });
});
