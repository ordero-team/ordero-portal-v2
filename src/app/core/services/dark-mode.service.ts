import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { LocalStorage } from '@lib/storage';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DarkModeService {
  public _isDarkTheme = new BehaviorSubject<boolean>(undefined);

  constructor(@Inject(DOCUMENT) private document: Document) {}

  get isDarkTheme(): boolean {
    return LocalStorage.getItem('isDark') === 'true';
  }

  get darkMode$(): Observable<any> {
    return this._isDarkTheme;
  }

  setDarkTheme(val: boolean) {
    this._isDarkTheme.next(val);

    if (val == true) {
      this.document.body.classList.replace('light', 'dark');
      LocalStorage.setItem('isDark', 'true');
    } else {
      this.document.body.classList.replace('dark', 'light');
      LocalStorage.setItem('isDark', 'false');
    }
  }
}
