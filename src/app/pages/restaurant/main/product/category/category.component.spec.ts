import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantProductCategoryComponent } from './category.component';

describe('RestaurantProductCategoryComponent', () => {
  let component: RestaurantProductCategoryComponent;
  let fixture: ComponentFixture<RestaurantProductCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantProductCategoryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
