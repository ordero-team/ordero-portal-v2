import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantProductMainComponent } from './main.component';

describe('RestaurantProductMainComponent', () => {
  let component: RestaurantProductMainComponent;
  let fixture: ComponentFixture<RestaurantProductMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantProductMainComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantProductMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
