import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../user/user.service';

export const ownerGuard: CanActivateFn = () => {
  return inject(UserService).currentUser()?.role === 'owner';
};
