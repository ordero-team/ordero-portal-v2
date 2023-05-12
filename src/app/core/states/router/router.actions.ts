import { ActivatedRouteSnapshot, NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';

export class RouterStateModel {
  NavigationStart?: NavigationStart;
  NavigationEnd?: NavigationEnd;
  NavigationCancel?: NavigationCancel;
  NavigationError?: NavigationError;
  snapshot?: ActivatedRouteSnapshot;
  query?: any;
  params?: any;
}

export class SetNavigationStart {
  static readonly type = '[Aka-Router] Set Navigation Start';
  constructor(public event: NavigationStart) {}
}

export class SetNavigationEnd {
  static readonly type = '[Aka-Router] Set Navigation End';
  constructor(public event: NavigationEnd) {}
}

export class SetNavigationCancel {
  static readonly type = '[Aka-Router] Set Navigation Cancel';
  constructor(public event: NavigationCancel) {}
}

export class SetNavigationError {
  static readonly type = '[Aka-Router] Set Navigation Error';
  constructor(public event: NavigationError) {}
}

export class SetSnapshot {
  static readonly type = '[Aka-Router] Set Snapshot';
  constructor(public snapshot: any) {}
}

export class SetQueryParams {
  static readonly type = '[Aka-Router] Set Query Params';
  constructor(public query: any, public params: any) {}
}
