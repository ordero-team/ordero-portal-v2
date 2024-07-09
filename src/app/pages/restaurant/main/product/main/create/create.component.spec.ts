import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantProductCreateComponent } from './create.component';

describe('RestaurantProductCreateComponent', () => {
  let component: RestaurantProductCreateComponent;
  let fixture: ComponentFixture<RestaurantProductCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantProductCreateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantProductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
