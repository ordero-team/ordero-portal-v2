import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalErrorComponent } from './metal-error.component';

describe('MetalErrorComponent', () => {
  let component: MetalErrorComponent;
  let fixture: ComponentFixture<MetalErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MetalErrorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
