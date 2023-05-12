import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalQueryPaginationComponent } from './metal-query-pagination.component';

describe('MetalQueryPaginationComponent', () => {
  let component: MetalQueryPaginationComponent;
  let fixture: ComponentFixture<MetalQueryPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MetalQueryPaginationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalQueryPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
