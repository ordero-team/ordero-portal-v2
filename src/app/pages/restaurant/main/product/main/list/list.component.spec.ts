import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantProductListComponent } from './list.component';

describe('RestaurantProductListComponent', () => {
  let component: RestaurantProductListComponent;
  let fixture: ComponentFixture<RestaurantProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantProductListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
