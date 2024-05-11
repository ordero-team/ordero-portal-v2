import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantProductDetailManageComponent } from './manage.component';

describe('RestaurantProductDetailManageComponent', () => {
  let component: RestaurantProductDetailManageComponent;
  let fixture: ComponentFixture<RestaurantProductDetailManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantProductDetailManageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantProductDetailManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
