import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantVerifyComponent } from './verify.component';

describe('RestaurantVerifyComponent', () => {
  let component: RestaurantVerifyComponent;
  let fixture: ComponentFixture<RestaurantVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantVerifyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
