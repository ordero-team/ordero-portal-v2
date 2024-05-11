import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantProductDetailComponent } from './detail.component';

describe('RestaurantProductDetailComponent', () => {
  let component: RestaurantProductDetailComponent;
  let fixture: ComponentFixture<RestaurantProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantProductDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
