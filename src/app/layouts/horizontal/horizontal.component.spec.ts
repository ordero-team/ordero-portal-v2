import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizonalLayoutComponent } from './horizontal.component';

describe('HorizonalLayoutComponent', () => {
  let component: HorizonalLayoutComponent;
  let fixture: ComponentFixture<HorizonalLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HorizonalLayoutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizonalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
