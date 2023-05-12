import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalQueryFilterComponent } from './metal-query-filter.component';

describe('MetalQueryFilterComponent', () => {
  let component: MetalQueryFilterComponent;
  let fixture: ComponentFixture<MetalQueryFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MetalQueryFilterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalQueryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
