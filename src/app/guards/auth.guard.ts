import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  RedirectCommand,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const isAuthenticated = this.userService.isAuthenticated();
    if (isAuthenticated) {
      return true;
    } else {
      const urlTree = this.router.createUrlTree(['/login'], {
        queryParams: { returnUrl: state.url },
      });
      return new RedirectCommand(urlTree, {
        replaceUrl: true,
      });
    }
  }
}
