import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantLocationComponent } from './location.component';

describe('RestaurantLocationComponent', () => {
  let component: RestaurantLocationComponent;
  let fixture: ComponentFixture<RestaurantLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantLocationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
