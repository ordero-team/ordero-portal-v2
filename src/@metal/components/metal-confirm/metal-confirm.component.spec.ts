import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalConfirmComponent } from './metal-confirm.component';

describe('MetalConfirmComponent', () => {
  let component: MetalConfirmComponent;
  let fixture: ComponentFixture<MetalConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MetalConfirmComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
