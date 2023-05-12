import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeeppackComponent } from './keeppack.component';

describe('KeeppackComponent', () => {
  let component: KeeppackComponent;
  let fixture: ComponentFixture<KeeppackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeeppackComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeeppackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
