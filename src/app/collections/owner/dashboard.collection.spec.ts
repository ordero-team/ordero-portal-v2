import { TestBed } from '@angular/core/testing';

import { DashboardCollection } from './dashboard.collection';

describe('DashboardCollection', () => {
  let collection: DashboardCollection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    collection = TestBed.inject(DashboardCollection);
  });

  it('should be created', () => {
    expect(collection).toBeTruthy();
  });
});
