import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffUserMenuComponent } from './user-menu.component';

describe('StaffUserMenuComponent', () => {
  let component: StaffUserMenuComponent;
  let fixture: ComponentFixture<StaffUserMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffUserMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffUserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
