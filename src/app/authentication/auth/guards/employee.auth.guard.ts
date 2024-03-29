import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from '../auth-service/auth.service';

@Injectable({ providedIn: 'root' })
export class EmployeeAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // tslint:disable-next-line: max-line-length
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot,
  ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.authService.getUser().pipe(
      take(1),
      map((user) => {
        const isAuth = !!user;
        if (isAuth && user.userRole === 'employee') {
          return true;
        }
        return this.router.createUrlTree(['/login']);
      }),
      // tap(isAuth => {
      //   if (!isAuth) {
      //     this.router.navigate(['/auth']);
      //   }
      // })
    );
  }

  // tslint:disable-next-line: max-line-length
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.canActivate(route, state);
  }
}
