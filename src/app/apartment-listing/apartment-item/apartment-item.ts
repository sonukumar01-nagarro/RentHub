import { Component, inject, input, model } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { Apartment } from '../apartment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apartment-item',
  imports: [CardModule, ButtonModule, CurrencyPipe],
  templateUrl: './apartment-item.html',
})
export class ApartmentItem {
  router = inject(Router);

  apartment = input<Apartment>();
  isFavorite = model<boolean>(false);

  toggleFavorite() {
    this.isFavorite.update((prev) => !prev);
  }

  onDetailsClick() {
    this.router.navigate(['apartment-detail', this.apartment()?.id]);
  }
}
