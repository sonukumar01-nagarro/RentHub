import { Component, computed, effect, inject, resource, signal } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';

import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Hero } from '../hero/hero';
import { ApartmentItem } from './apartment-item/apartment-item';
import { ApartmentService } from './apartment.service';
import { FormsModule } from '@angular/forms';
import { Apartment } from './apartment';
import { Loading } from '../loading/loading';
import { Error } from '../error/error';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-apartment-listing',
  imports: [
    ButtonModule,
    PaginatorModule,
    InputTextModule,
    InputGroupModule,
    SelectModule,
    InputGroupAddonModule,
    FormsModule,
    Hero,
    ApartmentItem,
    Loading,
    Error,
  ],
  templateUrl: './apartment-listing.html',
})
export class ApartmentListing {
  private readonly apartmentService = inject(ApartmentService);
  private readonly userService = inject(UserService);

  apartmentsResource = resource({
    loader: () => this.apartmentService.fetchApartments(),
  });

  originalApartments = computed(() =>
    this.apartmentsResource.hasValue() ? this.apartmentsResource.value() : [],
  );

  filteredApartments = computed(() => {
    const originalApartments = this.originalApartments();
    const { searchBy, searchValue } = this.searchFilter();
    const selectedSortOption = this.selectedSortOption();

    let filtered: Apartment[];
    if (searchValue) {
      const normalizedSearchValue = searchValue?.toLowerCase().trim();
      switch (searchBy) {
        case 'Name':
          filtered = originalApartments.filter((x) =>
            x.title.toLowerCase().includes(normalizedSearchValue),
          );
          break;
        case 'Location':
          filtered = originalApartments.filter((x) =>
            x.location.toLowerCase().includes(normalizedSearchValue),
          );
          break;
        case 'Surface Area':
          filtered = originalApartments.filter((x) => x.areaInSqFeet === normalizedSearchValue);
          break;
        case 'Rent':
          filtered = originalApartments.filter((x) => x.rent === +normalizedSearchValue);
          break;
        default:
          filtered = originalApartments;
          break;
      }
    } else {
      filtered = originalApartments;
    }

    switch (selectedSortOption) {
      case 'Rent: Low to High':
        filtered = filtered.slice().sort((a, b) => a.rent - b.rent);
        break;
      case 'Rent: High to Low':
        filtered = filtered.slice().sort((a, b) => b.rent - a.rent);
        break;
      case 'Surface Area: Low to High':
        filtered = filtered.slice().sort((a, b) => {
          const aNum = +a.areaInSqFeet.split(' ')[0].replace('\g,', '');
          const bNum = +b.areaInSqFeet.split(' ')[0].replace('\g,', '');

          return aNum - bNum;
        });
        break;
      case 'Surface Area: High to Low':
        filtered = filtered.slice().sort((a, b) => {
          const aNum = +a.areaInSqFeet.split(' ')[0].replace('\g,', '');
          const bNum = +b.areaInSqFeet.split(' ')[0].replace('\g,', '');

          return bNum - aNum;
        });
        break;

      default:
        filtered = filtered;
        break;
    }

    return filtered;
  });

  apartments = computed(() => {
    const first = this.first();
    const rows = this.rows();
    return this.filteredApartments()?.slice(first, first + rows);
  });

  featuredApartments = computed(() =>
    this.originalApartments().filter((_el, index) => index % 10 === 0),
  );

  first = signal(0);
  rows = signal(6);

  searchByOptions = signal(['Name', 'Location', 'Surface Area', 'Rent']);
  selectedSearchOption = signal<string | null>(null);
  searchValue = signal<string | null>(null);

  searchFilter = computed(() => {
    const selectedSearchOption = this.selectedSearchOption();
    const searchValue = this.searchValue();
    return { searchBy: selectedSearchOption, searchValue: searchValue };
  });

  sortByOptions = signal([
    'Rent: High to Low',
    'Rent: Low to High',
    'Surface Area: High to Low',
    'Surface Area: Low to High',
  ]);
  selectedSortOption = signal<string | null>(null);

  onPageChange(event: PaginatorState) {
    this.first.set(event.first ?? 0);
    this.rows.set(event.rows ?? 6);
  }

  isApartmentFavorite(id: number) {
    return this.userService.currentUser()?.favoriteApartments?.indexOf(id) !== -1;
  }

  async onFavoriteToggle(id: number, isMarkedFavorite: boolean) {
    const email = this.userService.currentUser()?.email;
    if (!email) {
      return;
    }
    const favoriteApartments = this.userService.currentUser()?.favoriteApartments ?? [];
    if (favoriteApartments.indexOf(id) === -1 && isMarkedFavorite) {
      favoriteApartments.push(id);
    }
    await this.userService.updateFavoriteList(email, favoriteApartments);
  }
}
