import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectVariantsComponent } from './select-variants.component';

describe('SelectVariantsComponent', () => {
  let component: SelectVariantsComponent;
  let fixture: ComponentFixture<SelectVariantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectVariantsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectVariantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
