import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffProductMainDetailOverviewComponent } from './overview.component';

describe('StaffProductMainDetailOverviewComponent', () => {
  let component: StaffProductMainDetailOverviewComponent;
  let fixture: ComponentFixture<StaffProductMainDetailOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffProductMainDetailOverviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffProductMainDetailOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
