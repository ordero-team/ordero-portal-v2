import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingSecurityComponent } from './security.component';

describe('SettingSecurityComponent', () => {
  let component: SettingSecurityComponent;
  let fixture: ComponentFixture<SettingSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingSecurityComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
