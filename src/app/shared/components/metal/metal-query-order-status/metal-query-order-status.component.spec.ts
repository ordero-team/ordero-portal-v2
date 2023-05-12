import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalQueryOrderStatusComponent } from './metal-query-order-status.component';

describe('MetalQueryOrderStatusComponent', () => {
  let component: MetalQueryOrderStatusComponent;
  let fixture: ComponentFixture<MetalQueryOrderStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetalQueryOrderStatusComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalQueryOrderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
