import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetalQueryCompanyComponent } from './metal-query-company.component';

describe('MetalQueryCompanyComponent', () => {
  let component: MetalQueryCompanyComponent;
  let fixture: ComponentFixture<MetalQueryCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetalQueryCompanyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalQueryCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
