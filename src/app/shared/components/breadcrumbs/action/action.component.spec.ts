import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbActionComponent } from './action.component';

describe('BreadcrumbActionsComponent', () => {
  let component: BreadcrumbActionComponent;
  let fixture: ComponentFixture<BreadcrumbActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BreadcrumbActionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
