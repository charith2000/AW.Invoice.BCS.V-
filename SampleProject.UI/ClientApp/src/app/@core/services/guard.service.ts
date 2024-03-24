import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  createUrlTreeFromSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";

import {AuthService} from "@core/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {

    const isAuthenticated = this.authService.isAuthenticated();

    if (isAuthenticated) {

      const allowedRoles = next.data.allowedRoles as string[];

      if (allowedRoles && allowedRoles.length > 0) {

        const userRoles = this.authService.getUserRoles();

        if (!userRoles.some(role => allowedRoles.includes(role))) {
          return this.router.createUrlTree(['unauthorized']);
        }
      }

      return true;
    } else {
      return createUrlTreeFromSnapshot(next, ['/']);
    }
  }

  private hasRequiredRoles(userRoles: string[], allowedRoles: string[]): boolean {
    return userRoles.some(role => {
      const [prefix] = role.split(':');
      return allowedRoles.includes(prefix);
    });
  }

  }
