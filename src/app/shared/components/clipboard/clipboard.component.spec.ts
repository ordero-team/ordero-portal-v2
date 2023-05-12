import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipboardComponent } from './clipboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastService } from '@cs/toast.service';

describe('ClipboardComponent', () => {
  let component: ClipboardComponent;
  let fixture: ComponentFixture<ClipboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClipboardComponent],
      providers: [ToastService],
      imports: [MatTooltipModule, MatIconModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
