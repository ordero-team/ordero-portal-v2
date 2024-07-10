import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderoComponent } from './ordero.component';

describe('OrderoComponent', () => {
  let component: OrderoComponent;
  let fixture: ComponentFixture<OrderoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
