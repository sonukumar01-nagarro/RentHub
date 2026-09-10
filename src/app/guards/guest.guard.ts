import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RedirectCommand,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '../user/user.service';

export const guestGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);
  const userService = inject(UserService);

  if (userService.currentUser()?.role === 'renter') {
    return router.createUrlTree(['apartments']);
  } else if (userService.currentUser()?.role === 'owner') {
    return router.createUrlTree(['admin-apartments']);
  } else {
    return true;
  }
};
