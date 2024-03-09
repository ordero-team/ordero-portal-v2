import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingRestaurantComponent } from './restaurant.component';

describe('SettingRestaurantComponent', () => {
  let component: SettingRestaurantComponent;
  let fixture: ComponentFixture<SettingRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingRestaurantComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
