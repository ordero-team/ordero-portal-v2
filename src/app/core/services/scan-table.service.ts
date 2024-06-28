import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScanTableService {
  private isShown: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isShownObservable: Observable<boolean> = this.isShown.asObservable();

  constructor() {}

  show() {
    this.isShown.next(true);
  }

  hide() {
    this.isShown.next(false);
  }
}
