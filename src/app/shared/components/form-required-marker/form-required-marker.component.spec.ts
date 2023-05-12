import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRequiredMarkerComponent } from './form-required-marker.component';

describe('FormRequiredMarkerComponent', () => {
  let component: FormRequiredMarkerComponent;
  let fixture: ComponentFixture<FormRequiredMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormRequiredMarkerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRequiredMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
