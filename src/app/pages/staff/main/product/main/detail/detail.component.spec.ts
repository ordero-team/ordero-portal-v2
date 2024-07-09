import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffProductMainDetailComponent } from './detail.component';

describe('StaffProductMainDetailComponent', () => {
  let component: StaffProductMainDetailComponent;
  let fixture: ComponentFixture<StaffProductMainDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffProductMainDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffProductMainDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
