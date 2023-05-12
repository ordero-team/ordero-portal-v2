import { AkaMediaWatcherService } from '@aka/services/media-watcher/media-watcher.service';
import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable } from 'rxjs';

@UntilDestroy()
@Injectable({ providedIn: 'root' })
export class SubNavigationService {
  private _isLoaded = new BehaviorSubject<any>(false);
  private _drawerMode = new BehaviorSubject<any>(undefined);
  private _drawerOpened = new BehaviorSubject<any>(undefined);
  private _closed = new BehaviorSubject<any>(undefined);
  private _opened = new BehaviorSubject<any>(undefined);

  constructor(private mediaWatcher: AkaMediaWatcherService) {
    this.mediaWatcher.onMediaChange$.pipe(untilDestroyed(this)).subscribe(({ matchingAliases }) => {
      // Set the drawerMode and drawerOpened
      if (matchingAliases.includes('sm')) {
        this.drawerMode = 'side';
        this.drawerOpened = true;
      } else {
        this.drawerMode = 'over';
        this.drawerOpened = false;
      }
    });
  }

  set drawerMode(val: any) {
    this._drawerMode.next(val);
  }

  get drawerMode$(): Observable<any> {
    return this._drawerMode;
  }

  set drawerOpened(val: any) {
    this._drawerOpened.next(val);
  }

  get drawerOpened$(): Observable<any> {
    return this._drawerOpened;
  }

  set closed(val: any) {
    this._closed.next(val);
  }

  get closed$(): Observable<any> {
    return this._closed;
  }

  set opened(val: any) {
    this._opened.next(val);
  }

  get opened$(): Observable<any> {
    return this._opened;
  }

  set isLoaded(val: any) {
    this._isLoaded.next(val);
  }

  get isLoaded$(): Observable<any> {
    return this._isLoaded;
  }

  open() {
    this.drawerOpened = true;
  }

  close() {
    this.drawerOpened = false;
  }
}
