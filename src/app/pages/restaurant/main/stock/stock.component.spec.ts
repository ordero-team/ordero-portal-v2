import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantStockComponent } from './stock.component';

describe('RestaurantStockComponent', () => {
  let component: RestaurantStockComponent;
  let fixture: ComponentFixture<RestaurantStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantStockComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
