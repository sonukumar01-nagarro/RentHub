import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { UserService } from '../user/user.service';
import { Role } from '../user/user.model';

export const hasRole = (role: Role): CanMatchFn => {
  return () => {
    const userService = inject(UserService);
    return userService.currentUser()?.role === role;
  };
};
