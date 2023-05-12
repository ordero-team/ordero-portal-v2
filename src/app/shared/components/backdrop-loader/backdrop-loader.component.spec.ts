import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackdropLoaderComponent } from './backdrop-loader.component';

describe('BackdropLoaderComponent', () => {
  let component: BackdropLoaderComponent;
  let fixture: ComponentFixture<BackdropLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackdropLoaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackdropLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
