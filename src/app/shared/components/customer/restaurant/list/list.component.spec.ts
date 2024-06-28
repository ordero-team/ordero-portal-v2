import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerRestaurantListComponent } from './list.component';

describe('CustomerRestaurantListComponent', () => {
  let component: CustomerRestaurantListComponent;
  let fixture: ComponentFixture<CustomerRestaurantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerRestaurantListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRestaurantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
