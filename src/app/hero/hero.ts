import { Component, input } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Apartment } from '../apartment-listing/apartment';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [CarouselModule, CurrencyPipe],
  templateUrl: './hero.html',
})
export class Hero {
  featuredApartments = input<Apartment[]>([]);
}
