import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerUserMenuComponent } from './user-menu.component';

describe('OwnerUserMenuComponent', () => {
  let component: OwnerUserMenuComponent;
  let fixture: ComponentFixture<OwnerUserMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OwnerUserMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerUserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
