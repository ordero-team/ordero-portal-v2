import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffProductComponent } from './product.component';

describe('StaffProductComponent', () => {
  let component: StaffProductComponent;
  let fixture: ComponentFixture<StaffProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffProductComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
