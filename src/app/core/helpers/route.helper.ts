import { ActivatedRouteSnapshot } from '@angular/router';

export function paramsTree(active: ActivatedRouteSnapshot, fromParams: any = {}) {
  const params: any = {};

  if (active.params) {
    Object.assign(params, active.params, fromParams);
  }

  if (active.parent) {
    return paramsTree(active.parent, params);
  }

  return params;
}

export function assignResolveData(data) {
  for (const [key, value] of Object.entries(data)) {
    this[key] = value;
  }
}

export function checkRouterChildData(route: ActivatedRouteSnapshot & { data?: any }, compareWith: (data: any) => boolean) {
  if (compareWith(route.data)) {
    return true;
  }

  if (!route.firstChild) {
    return false;
  }

  return checkRouterChildData(route.firstChild, compareWith);
}
