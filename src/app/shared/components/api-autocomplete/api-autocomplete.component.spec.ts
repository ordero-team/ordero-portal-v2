import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiAutocompleteComponent } from './api-autocomplete.component';

describe('ApiAutocompleteComponent', () => {
  let component: ApiAutocompleteComponent;
  let fixture: ComponentFixture<ApiAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiAutocompleteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
