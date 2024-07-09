import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffProductGroupComponent } from './group.component';

describe('StaffProductGroupComponent', () => {
  let component: StaffProductGroupComponent;
  let fixture: ComponentFixture<StaffProductGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffProductGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffProductGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
