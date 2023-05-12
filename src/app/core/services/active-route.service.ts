import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { paramsTree } from '@ch/route.helper';
import { INavRoute } from '@cs/navigation.service';
import { get } from 'lodash';

/**
 * An Interface to define the data that will be displayed on the breadcrumb component.
 */
export interface IRouteDisplay {
  path: string;
  title: string;
  icon?: string;
  link?: string[];
  disabled?: boolean;
}

/**
 * An Interface to define router segment that will be used by the breadcrumb component.
 * Route Segment contains data related to the Router Config and {@link IRouteDisplay},
 * also the data and params of the acvite Route.
 */
export interface IRouteSegment {
  config: any;
  data?: any;
  params?: any;
  display?: IRouteDisplay;
  parent?: IRouteSegment;
  children?: IRouteSegment;
}

/**
 * An Interface to define a list of a {@link IRouteSegment}. The breadcrumb component
 * will iterate this interface to render the links.
 */
export type IRouteSegments = Array<IRouteSegment>;

/**
 * A service that handle Router's Navigation End event to build a {@link IRouteSegments}. When
 * building the segment, the service will get the active root and build a segments to the root
 * route. After getting the segments, the service will map the segments so we can get the
 * advanced details of the segment such what the route name, icon, text, link, etc. The service
 * will also read the activated route's data to create a dynamic segment title to be displayed
 * on the breadcrumb. Check the diagram here:
 * https://drive.google.com/open?id=1IB5DA0iU4umvGR4FXziYUgJe37t6jZAQ
 */
@Injectable({
  providedIn: 'root',
})
export class ActiveRouteService {
  route: ActivatedRouteSnapshot;
  state: ActivatedRoute;
  segment: IRouteSegment;
  segments: IRouteSegments;

  activeURLs: string[] = [];
  currentRoute: string = null;
  segmentChange = new EventEmitter();

  static buildSegment(route: IRouteSegment): IRouteDisplay {
    return buildSegment(route);
  }

  constructor(private router: Router, route: ActivatedRoute) {
    this.route = route.snapshot;
    this.state = route;
    this.assignSegments();

    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentData: any = {};
        const currentParams: any = {};

        this.route = route.snapshot;
        this.state = route;

        while (this.state.firstChild !== null) {
          this.state = this.state.firstChild;
        }

        this.activeURLs = [];
        this.state.pathFromRoot.forEach((state) => {
          state.data.subscribe((data) => Object.assign(currentData, data));
          state.params.subscribe((params) => Object.assign(currentParams, params));
          state.url.subscribe((segments) => {
            segments.forEach((segment) => this.activeURLs.push(segment.path));
          });
        });

        this.route = this.state.snapshot;

        const routeConfig: INavRoute = this.route.routeConfig;
        this.currentRoute = routeConfig.name;
        this.assignSegments();
      }
    });
  }

  /**
   * Create a relative URL from the active route, or from the custom route
   * when defined.
   * @param next
   * @param fromRoute
   */
  relativeURL(next: string, fromRoute?: ActivatedRoute): any {
    let baseURLs = this.activeURLs;

    if (fromRoute) {
      baseURLs = [];

      return new Promise(async (resolve) => {
        await Promise.all(
          fromRoute.pathFromRoot.map((state) => {
            return new Promise<void>((finish) => {
              state.url.subscribe((segments) => {
                segments.forEach((segment) => baseURLs.push(segment.path));
                finish();
              });
            });
          })
        );

        resolve(relativeURL(baseURLs, next));
      });
    }

    return relativeURL(baseURLs, next);
  }

  /**
   * Navigate to the specified URL, relative to the activated route.
   * @param url
   * @param options
   */
  navigate(url: string | string[], options?: any) {
    if (Array.isArray(url)) {
      url = url.join('/');
    }

    return this.router.navigate([this.relativeURL(url)], options);
  }

  /**
   * Update the service state so the components that use it will get the updates.
   * @param state
   */
  assignState(state: ActivatedRoute) {
    this.state = state;
    this.assignSegments();
  }

  /**
   * Assign new {@link IRouteSegments} to the state.
   * @param fromState
   */
  assignSegments(fromState?: ActivatedRoute) {
    this.generateSegments([], fromState || this.state)
      .then((segments) => {
        this.segments = segments;
        this.segment = buildTree(this.segments);
        this.segmentChange.emit(this.segment);
      })
      .catch(console.error);
  }

  /**
   * Generate new {@link IRouteSegments} from the active route.
   * @param segments
   * @param fromState
   */
  async generateSegments(segments: IRouteSegments, fromState: ActivatedRoute): Promise<IRouteSegments> {
    const parent = fromState.parent;
    const route: IRouteSegment = { config: fromState.routeConfig };

    if (!route.config) {
      return [];
    }

    const params: any = await new Promise((resolve) => {
      fromState.params.subscribe(resolve);
    });
    route.params = { ...paramsTree(this.route), ...params };
    route.data = await new Promise((resolve) => {
      fromState.data.subscribe(resolve);
    });
    route.display = buildSegment(route);

    if (parent && parent.routeConfig) {
      if (parent.routeConfig.path) {
        await this.generateSegments(segments, parent);
      } else {
        if (parent.parent && parent.parent.routeConfig && parent.parent.routeConfig.path) {
          await this.generateSegments(segments, parent.parent);
        }
      }
    }

    if (route.display.path) {
      segments.push(route);
    }

    return segments;
  }

  /**
   * Check does a route is activated.
   * @param routes
   */
  isActionAvailable(routes: any = []) {
    return routes.includes(this.currentRoute);
  }
}

/**
 * Build the {@link IRouteSegments}.
 * @param segments
 */
function buildTree(segments: IRouteSegments) {
  let current;

  for (const segment of segments) {
    if (current) {
      current.children = segment;
      segment.parent = current;
      segment.display.link = [...current.display.link, segment.display.path];
    } else {
      segment.display.link = [`/${segment.display.path}`];
    }

    current = segment;
  }

  return segments[0];
}

/**
 * Build the {@link IRouteDisplay} to define advanced route details.
 * @param route
 */
function buildSegment(route: IRouteSegment): IRouteDisplay {
  const { config, data, params } = route;
  const { icon, title, path, maps, disabled } = config;
  const display: IRouteDisplay = { icon, title, path, disabled };

  if (data && maps) {
    for (const [key, map] of Object.entries(maps)) {
      if (data[key]) {
        display[map[0]] = get(data[key], map[1] as string, data[key][map[1]]);
      }
    }
  }

  display.path = assignParams(display.path, params);

  return display;
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

/**
 * Build a relative URL.
 * @param activeURLS
 * @param next
 */
function relativeURL(activeURLS: string[], next: string) {
  if (/^\//.test(next)) {
    return next;
  }

  const activeSegments = [...activeURLS];
  const targetSegments = next.split('/');
  const nextSegments = [];

  for (let i = targetSegments.length - 1; i >= 0; --i) {
    const url = targetSegments[i];

    if (url === '..') {
      activeSegments.pop();
    } else {
      if (url && url !== '.') {
        nextSegments.splice(0, 0, url);
      }
    }
  }

  return [...activeSegments, ...nextSegments].join('/');
}
