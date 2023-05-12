import { TestBed } from '@angular/core/testing';

import { AuthCollection } from './auth.collection';

describe('AuthCollection', () => {
  let collection: AuthCollection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    collection = TestBed.inject(AuthCollection);
  });

  it('should be created', () => {
    expect(collection).toBeTruthy();
  });
});
