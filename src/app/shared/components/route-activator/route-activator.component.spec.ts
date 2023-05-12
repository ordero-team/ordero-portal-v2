import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteActivatorComponent } from './route-activator.component';

describe('RouteActivatorComponent', () => {
  let component: RouteActivatorComponent;
  let fixture: ComponentFixture<RouteActivatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RouteActivatorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteActivatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
