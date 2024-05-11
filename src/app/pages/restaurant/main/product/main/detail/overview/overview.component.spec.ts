import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantProductDetailOverviewComponent } from './overview.component';

describe('RestaurantProductDetailOverviewComponent', () => {
  let component: RestaurantProductDetailOverviewComponent;
  let fixture: ComponentFixture<RestaurantProductDetailOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantProductDetailOverviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantProductDetailOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
