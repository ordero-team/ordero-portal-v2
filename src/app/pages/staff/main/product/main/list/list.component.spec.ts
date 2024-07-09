import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffProductMainListComponent } from './list.component';

describe('StaffProductMainListComponent', () => {
  let component: StaffProductMainListComponent;
  let fixture: ComponentFixture<StaffProductMainListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffProductMainListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffProductMainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
