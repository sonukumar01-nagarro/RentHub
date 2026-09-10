import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../user/user.service';

export const renterGuard: CanActivateFn = () => {
  return inject(UserService).currentUser()?.role === 'renter';
};
