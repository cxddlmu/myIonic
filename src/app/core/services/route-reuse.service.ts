import {
  RouteReuseStrategy,
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouterModule,
  Routes,
  UrlSegment
} from '@angular/router';
export class RouteReuseService implements RouteReuseStrategy {
  private handlers: { [key: string]: DetachedRouteHandle } = {};
  //It is invoked when we leave the current route
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    if (!route.routeConfig || route.routeConfig.loadChildren) {
      return false;
    }
    let shouldReuse = false;
    console.log('checking if this route should be re used or not', route);
    if (route.routeConfig.data) {
      route.routeConfig.data.reuse ? shouldReuse = true : shouldReuse = false;
    }
    return shouldReuse;
  }
  //This method is invoked only if the shouldDetach returns true
  store(route: ActivatedRouteSnapshot, handler: DetachedRouteHandle): void {
    console.log('storing handler');
    if (handler) {
      this.handlers[this.getUrl(route)] = handler;
    }
  }
  //This method is called for the route just opened when we land on the component of this route
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    console.log('checking if it should be re attached');
    return !!this.handlers[this.getUrl(route)];
  }
  //This method is called if shouldAttach returns TRUE
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig || route.routeConfig.loadChildren) {
      return null;
    };
    return this.handlers[this.getUrl(route)];
  }
  /**
   * This method is called everytime we navigate between routes. 
   * The future is the route we are leaving (not sure why is called future) and curr is the route we are landing. If it returns TRUE the routing will not happen (which means that routing has not changed). 
   * If it returns FALSE then the routing happens and the rest of the methods are called.
   * @param future 
   * @param current 
   */
  shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
    let reUseUrl = false;
    if (future.routeConfig) {
      if (future.routeConfig.data) {
        reUseUrl = future.routeConfig.data.reuse;
      }
    }
    const defaultReuse = (future.routeConfig === current.routeConfig);
    return reUseUrl || defaultReuse;
  }
  getUrl(route: ActivatedRouteSnapshot): string {
    if (route.routeConfig) {
      const url = route.routeConfig.path;
      console.log('returning url', url);
      return url;
    }
  }
}