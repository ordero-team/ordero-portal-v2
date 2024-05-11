import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantProductVariantComponent } from './variant.component';

describe('RestaurantProductVariantComponent', () => {
  let component: RestaurantProductVariantComponent;
  let fixture: ComponentFixture<RestaurantProductVariantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantProductVariantComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantProductVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
