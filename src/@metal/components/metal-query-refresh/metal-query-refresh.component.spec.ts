import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalQueryRefreshComponent } from './metal-query-refresh.component';

describe('MetalQueryRefreshComponent', () => {
  let component: MetalQueryRefreshComponent<any>;
  let fixture: ComponentFixture<MetalQueryRefreshComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MetalQueryRefreshComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalQueryRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
