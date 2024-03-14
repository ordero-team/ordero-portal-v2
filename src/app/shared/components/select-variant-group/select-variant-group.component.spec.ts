import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectVariantGroupComponent } from './select-variant-group.component';

describe('SelectVariantGroupComponent', () => {
  let component: SelectVariantGroupComponent;
  let fixture: ComponentFixture<SelectVariantGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectVariantGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectVariantGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
