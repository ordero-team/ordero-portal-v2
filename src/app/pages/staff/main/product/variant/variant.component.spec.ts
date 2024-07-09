import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffProductVariantComponent } from './variant.component';

describe('StaffProductVariantComponent', () => {
  let component: StaffProductVariantComponent;
  let fixture: ComponentFixture<StaffProductVariantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffProductVariantComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffProductVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
