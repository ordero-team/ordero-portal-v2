import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffStockComponent } from './stock.component';

describe('StaffStockComponent', () => {
  let component: StaffStockComponent;
  let fixture: ComponentFixture<StaffStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffStockComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
