import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalQueryStoreComponent } from './metal-query-store.component';

describe('MetalQueryStoreComponent', () => {
  let component: MetalQueryStoreComponent;
  let fixture: ComponentFixture<MetalQueryStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetalQueryStoreComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalQueryStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
