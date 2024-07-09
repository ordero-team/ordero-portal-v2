import { TestBed } from '@angular/core/testing';

import { ImageCollection } from './image.collection';

describe('ImageCollection', () => {
  let collection: ImageCollection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    collection = TestBed.inject(ImageCollection);
  });

  it('should be created', () => {
    expect(collection).toBeTruthy();
  });
});
