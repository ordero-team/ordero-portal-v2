import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { paramsTree } from '@ch/route.helper';
import { BaseResource as Resource } from './resource';

/**
 * A list of parent resource keys. The key should be the same with the one that
 * defined on the router config, and the value should be the endpoint of the parent resource.
 */
export interface IParentRoutes {
  [key: string]: string;
}

/**
 * An object that can be used for both API resolver. This object will be
 * used to compose the API endpoint facetFilters.
 */
export interface IHybridParams {
  key: string;
  path: string;
  value: string;
}

/**
 * A base class to help handling common tasks when resolving data from the
 * API. This class aimed to reduce the repetitive things when we try to
 * pull data during the `resolve` stage on the route change.
 *
 *
 * To achieve this, we need to add a handler like on the `resolveAll()` method of this class. So
 * instead adding this on each resolver, would be better if each resolvers will just extend
 * this class so we don't end up with a huge codebase because of a repetitive things.
 *
 * @example
 *
 * This sample is how we resolve projects from both API. On this sample,
 * when the router params contains any property on the `parents` property, the resolver
 * will add it to the API endpoint.
 *
 * Since there is no special behavior during the resolve, we don't need to add a `resolve()`
 * method to the class.
 * <script>
 *   @Injectable({ providedIn: 'root' })
 *   export class ProjectChildResolveService extends Resolver<IProject[]> {
 *   parents = {
 *     organization_id: OrganizationConfigs.endpoint,
 *     user_id: UserConfigs.endpoint
 *   };
 *   constructor(service: ProjectService, router: Router) {
 *     super(service, router);
 *   }
 * }
 * </script>
 *
 * At some point, we need a special thing during the resolve. E.g, we need to set a different
 * params name for the API. In this case, we can override the `resolve()` method
 * to handle that property. For example:
 */
export class Resolver<T> implements Resolve<T> {
  /**
   * A property to tell the resolver that this resource has a parent resources. So
   * when the resolver trying to pull the data, it will check does the given `key`
   * on the `parents` property is exist on the `ActivatedRouteSnapshot.params` to compose
   * the API endpoint
   */
  public parents: IParentRoutes = {};
  /**
   * Additional property to tell the resolver that the resource endpoint is prefixed.
   */
  public endpointPrefix: string;

  /**
   * @constructor
   * @param resource - A resource class that will be used to pull the data.
   * @param router
   */
  constructor(protected resource: Resource | any, protected router: Router) {}

  /**
   * A method that will handle the tasks to pull the data from the API. This method
   * will do the complex things behind the switch between API.
   *
   * @param active - Activated route snapshot from the resolve() method to collect the params.
   * @param limit - Optional limit to reduce the response from the API.
   * @param params - Optional params to be forwarded to the API.
   */
  async resolveAll(active: ActivatedRouteSnapshot, limit?: number, params: any = {}): Promise<T> {
    const { resource } = this;
    const { configs } = resource;
    const restParams = paramsTree(active);
    const rootParams = this.buildRootParams(paramsTree(active));

    if (limit) {
      params.per_page = limit;
    }

    if (configs.relations && Object.keys(configs.relations).length) {
      const allParams = { ...restParams, ...params };
      resource.currentParams = allParams;
      return await resource.findAll(allParams);
    }

    if (rootParams.length) {
      const currentEndpoint = configs.endpoint.replace(/^\//, '');
      let endpoint = [...rootParams.map(({ path, value }: IHybridParams) => [path, value].join('/')), currentEndpoint].join(
        '/'
      );

      if (this.endpointPrefix && !endpoint.startsWith(this.endpointPrefix)) {
        endpoint = `${this.endpointPrefix}/${endpoint}`;
      }

      resource.currentEndpoint = endpoint;
      return await resource.findAll(params, { endpoint });
    }

    return await resource.findAll();
  }

  /**
   * Default resolve method used by the Angular's resolver to for simple
   * usage we don't need to add this method to all resolver that extend this class.
   * @param active - Activated route snapshot give by the Angular router.
   */
  async resolve(active: ActivatedRouteSnapshot): Promise<T> {
    return await this.resolveAll(active);
  }

  /**
   * A method to build params from root, so the resolver can compose the
   * endpoint or facetFilters.
   *
   * @param routeParams - An object returned by the paramsTree() function.
   */
  protected buildRootParams(routeParams: any) {
    const activeParams: any[] = [];

    for (const [key, path] of Object.entries(this.parents || {})) {
      if (routeParams[key]) {
        activeParams.push({
          key,
          path,
          value: routeParams[key],
        });
      }
    }

    return activeParams;
  }
}
