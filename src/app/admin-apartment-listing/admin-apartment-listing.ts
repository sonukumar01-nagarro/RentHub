import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, computed, inject, resource } from '@angular/core';

import { BadgeModule } from 'primeng/badge';
import { DataViewModule } from 'primeng/dataview';

import { ApartmentService } from '../apartment-listing/apartment.service';
import { UserService } from '../user/user.service';
import { ButtonDirective } from 'primeng/button';
import { Router } from '@angular/router';
import { Error } from "../error/error";
import { Loading } from "../loading/loading";

@Component({
  selector: 'app-admin-apartment-listing',
  imports: [DataViewModule, BadgeModule, CurrencyPipe, NgClass, ButtonDirective, Error, Loading],
  templateUrl: './admin-apartment-listing.html',
})
export class AdminApartmentListing {
  private readonly userService = inject(UserService);
  private readonly apartmentService = inject(ApartmentService);
  private readonly router = inject(Router);

  apartmentsResource = resource({
    params: () => this.userService.currentUser()?.email,
    loader: async ({ params: email }) => await this.apartmentService.fetchApartmentsByOwner(email),
  });

  apartments = computed(() => this.apartmentsResource.value());
  isLoading = computed(() => this.apartmentsResource.isLoading());
  error = computed(() => this.apartmentsResource.error());

  onViewDetails(id: string) {
    this.router.navigate(['/apartment-detail', id]);
  }
}
