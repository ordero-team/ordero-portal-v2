import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalQueryComponent } from './metal-query.component';

describe('MetalQueryComponent', () => {
  let component: MetalQueryComponent;
  let fixture: ComponentFixture<MetalQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MetalQueryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
