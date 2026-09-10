import { Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
import { hasRole } from './guards/has-role.guard';
import { ownerGuard } from './guards/owner.guard';
import { renterGuard } from './guards/renter.guard';
import { NotFound } from './not-found/not-found';
import { User } from './user/user';

export const routes: Routes = [
  {
    path: 'login',
    component: User,
    canActivate: [guestGuard],
  },
  {
    path: 'apartments',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./apartment-listing/apartment-listing').then((c) => c.ApartmentListing),
        canMatch: [hasRole('renter')],
        canActivate: [renterGuard],
      },
      {
        path: '',
        loadComponent: () =>
          import('./admin-apartment-listing/admin-apartment-listing').then(
            (c) => c.AdminApartmentListing,
          ),
        canMatch: [hasRole('owner')],
        canActivate: [ownerGuard],
      },
    ],
  },
  {
    path: 'apartment-detail/:id',
    loadComponent: () =>
      import('./apartment-listing/apartment-detail/apartment-detail').then(
        (c) => c.ApartmentDetail,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'add-postings',
    loadComponent: () =>
      import('./admin-apartment-listing/add-postings/add-postings').then((c) => c.AddPostings),
    canActivate: [AuthGuard, ownerGuard],
  },
  {
    path: '',
    redirectTo: 'apartments',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFound,
  },
];
