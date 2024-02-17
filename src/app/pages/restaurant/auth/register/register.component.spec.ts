import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantRegisterComponent } from './register.component';

describe('RestaurantRegisterComponent', () => {
  let component: RestaurantRegisterComponent;
  let fixture: ComponentFixture<RestaurantRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantRegisterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
