import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffOrderListComponent } from './list.component';

describe('StaffOrderListComponent', () => {
  let component: StaffOrderListComponent;
  let fixture: ComponentFixture<StaffOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffOrderListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
