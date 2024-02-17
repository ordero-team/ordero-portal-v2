import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { paramsTree } from '@ch/route.helper';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { get, has, isEmpty } from 'lodash';
import { filter } from 'rxjs/operators';

export interface INavRoute extends Route {
  id?: any;
  type?: string;
  name?: any;
  title?: any;
  subtitle?: any;
  icon?: any;
  link?: string;
  nameFromRoot?: string;
  titleFromRoot?: string;
  children?: INavRoute[];
  roles?: string | string[];
  permissions?: string | string[];
  hideMainNav?: boolean;
  toggle?: 'open' | 'close';
  maps?: any;
  _loadedConfig?: {
    routes: INavRoute[];
  };
}

export interface INavMainRoute extends Route {
  // for breadcrumb purposes
  title: any;
  children?: INavRoute[];
}

export type INavRoutes = Array<INavRoute>;
export type INavMainRoutes = Array<INavMainRoute>;

@Injectable({ providedIn: 'root' })
export class NavigationService {
  configs: INavRoute[] = [];

  constructor(private router: Router, private translateService: TranslateService, private title: Title) {}

  register(routes: INavRoute[]) {
    this.configs = routes;

    const rootPaths = generateRootPath(this.router.config as INavRoute[]);
    assignRootPath(rootPaths, this.configs);
  }

  buildNav(route?: ActivatedRoute) {
    let params = '';
    if (route && has(route, 'snapshot')) {
      params = paramsTree(route.snapshot);
    }

    return this.buildMenu(this.configs, '', params);
  }

  buildMenu(configs: INavRoute[], parentPath = '', params = '') {
    const results: INavRoute[] = [];
    const filters = configs.filter((item) => !item.hideMainNav);
    for (const config of filters) {
      const item = this.buildItem(config, parentPath, params);
      results.push(item);
    }

    return results;
  }

  buildItem(config: INavRoute, parentPath = '', params = '') {
    let children: INavRoute[] = [];
    const { name, title, icon, path: oriPath, permissions, children: kids = [], type = 'basic' } = config;
    const path = buildPath([parentPath, oriPath]);
    if (kids.length) {
      children = this.buildMenu(kids, path);
    }

    const link = assignParams(path, params);
    const item: INavRoute = {
      id: name,
      name,
      path,
      icon,
      link,
      type,
      permissions,
      children,
      title: this.translateService.instant(`nav.${title}`),
    };
    return item;
  }

  buildTopNavs(route: ActivatedRoute) {
    const name = this.getRootName(route);
    const { children = [] } = this.buildNav(route).find((item) => item.name === name) || {};
    return children;
  }

  setPageTitle(route: ActivatedRoute, lazyTranslateService?: TranslateService) {
    const lastChild = getLastChildRoute(route);
    const { title }: INavRoute = lastChild.routeConfig || {};
    const translate = lazyTranslateService || this.translateService;
    if (title) {
      translate
        .get(`title.${title}`)
        .pipe(filter((translatedTitle) => translatedTitle !== title))
        .subscribe((translatedTitle) => {
          this.title.setTitle(`${translatedTitle} - ${environment.appName}`);
        });
    } else {
      this.title.setTitle(environment.appName);
    }
  }

  getRootName(route: ActivatedRoute) {
    const { routeConfig } = getLastChildRoute(route);
    if (routeConfig && has(routeConfig, 'name')) {
      const name = (routeConfig as INavRoute).name;
      const activeMenu: INavRoute = findMenu(name, this.configs);
      if (activeMenu && activeMenu.nameFromRoot) {
        const names = activeMenu.nameFromRoot.split('/').filter(Boolean);
        return names[0];
      }
    }

    return '';
  }

  reset() {
    this.configs = [];
  }
}

function getLastChildRoute(route: ActivatedRoute): ActivatedRoute {
  let lastChild = route;
  while (lastChild.firstChild !== null) {
    lastChild = lastChild.firstChild;
  }

  return lastChild;
}

function generateRootPath(routes: INavRoute[], path?: string) {
  let results = [];

  for (const route of routes) {
    if (route.redirectTo) {
      continue;
    }

    if (route.children && !isEmpty(route.children)) {
      const temp = generateRootPath(route.children, route.path);
      results = [...results, ...temp];
      continue;
    }

    results.push({
      path: buildPath([path, route.path]),
      title: route.title,
      name: route.name,
    });
  }

  return results;
}

function assignRootPath(rootPaths, routes: INavRoute[], currentRoute: INavRoute = {}) {
  for (const route of routes) {
    const findPath = rootPaths.find((item) => item.name === route.name);
    if (findPath) {
      Object.assign(route, { path: findPath.path });
    }

    const { nameFromRoot = '', titleFromRoot = '' } = currentRoute;
    Object.assign(route, {
      nameFromRoot: [nameFromRoot, route.name].join('/'),
      titleFromRoot: [titleFromRoot, route.title].join('/'),
    });
    if (route.children && !isEmpty(route.children)) {
      assignRootPath(rootPaths, route.children, route);
    }
  }
}

function buildPath(paths: any[]) {
  const path = paths
    .join('/')
    .split('/')
    .filter((x) => x)
    .join('/');

  return `/${path}`;
}

function assignParams(path: string, params: any) {
  const split = path.split('/');

  split.forEach((item, idx) => {
    if (item.startsWith(':')) {
      split[idx] = get(params, item.replace(':', ''), item);
    }
  });

  return split.join('/');
}

function findMenu(name, items) {
  for (const item of items) {
    if (item.name === name) {
      return item;
    } else if (item.children && Array.isArray(item.children)) {
      const found = findMenu(name, item.children);
      if (found) {
        return found;
      }
    }
  }

  return null;
}
