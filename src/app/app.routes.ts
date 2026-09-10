import { Routes } from '@angular/router';
import { ApartmentListing } from './apartment-listing/apartment-listing';
import { User } from './user/user';
import { ApartmentDetail } from './apartment-listing/apartment-detail/apartment-detail';
import { AddPostings } from './admin-apartment-listing/add-postings/add-postings';
import { AuthGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
import { hasRole } from './guards/has-role.guard';
import { AdminApartmentListing } from './admin-apartment-listing/admin-apartment-listing';
import { ownerGuard } from './guards/owner.guard';
import { renterGuard } from './guards/renter.guard';

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
        component: ApartmentListing,
        canMatch: [hasRole('renter')],
        canActivate: [renterGuard],
      },
      {
        path: '',
        component: AdminApartmentListing,
        canMatch: [hasRole('owner')],
        canActivate: [ownerGuard],
      },
    ],
  },
  {
    path: 'apartment-detail/:id',
    component: ApartmentDetail,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-postings',
    component: AddPostings,
    canActivate: [AuthGuard, ownerGuard],
  },
  {
    path: '',
    redirectTo: 'apartments',
    pathMatch: 'full',
  },
];
