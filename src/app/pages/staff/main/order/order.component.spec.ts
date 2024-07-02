import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffOrderComponent } from './order.component';

describe('StaffOrderComponent', () => {
  let component: StaffOrderComponent;
  let fixture: ComponentFixture<StaffOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffOrderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
