import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffProductMainCreateComponent } from './create.component';

describe('StaffProductMainCreateComponent', () => {
  let component: StaffProductMainCreateComponent;
  let fixture: ComponentFixture<StaffProductMainCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffProductMainCreateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffProductMainCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
