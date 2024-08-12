import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownDateRangeComponent } from './dropdown-date-range.component';

describe('DropdownDateRangeComponent', () => {
  let component: DropdownDateRangeComponent;
  let fixture: ComponentFixture<DropdownDateRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownDateRangeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownDateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
