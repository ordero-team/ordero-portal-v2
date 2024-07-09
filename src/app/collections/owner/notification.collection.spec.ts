import { TestBed } from '@angular/core/testing';

import { NotificationCollection } from './notification.collection';

describe('NotificationCollection', () => {
  let collection: NotificationCollection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    collection = TestBed.inject(NotificationCollection);
  });

  it('should be created', () => {
    expect(collection).toBeTruthy();
  });
});
