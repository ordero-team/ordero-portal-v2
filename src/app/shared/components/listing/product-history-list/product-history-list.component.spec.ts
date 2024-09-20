import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHistoryListComponent } from './product-history-list.component';

describe('ProductHistoryListComponent', () => {
  let component: ProductHistoryListComponent;
  let fixture: ComponentFixture<ProductHistoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductHistoryListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
