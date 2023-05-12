import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { DarkModeService } from '@app/core/services/dark-mode.service';

@Component({
  selector: 'toggle-dark-mode',
  templateUrl: './toggle-dark-mode.component.html',
  styleUrls: ['./toggle-dark-mode.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'toggleDarkMode',
})
export class ToggleDarkModeComponent {
  isDarkTheme: boolean;

  _iconOnly = false;
  @Input()
  get iconOnly() {
    return this._iconOnly;
  }

  set iconOnly(val: boolean) {
    if (this.iconOnly != val) {
      this._iconOnly = val;
    }
  }

  @Output() change = new EventEmitter<boolean>();

  constructor(private darkModeService: DarkModeService) {
    this.darkModeService.darkMode$.subscribe((val) => {
      this.isDarkTheme = val;
      this.change.emit(val);
    });
  }

  toggle() {
    this.darkModeService.setDarkTheme(!this.isDarkTheme);
  }
}
