import { Component, computed, effect, inject, input, resource } from '@angular/core';

import { CardModule } from 'primeng/card';

import { Apartment } from '../apartment';
import { CommentBox } from '../../comment-box/comment-box';
import { ActivatedRoute } from '@angular/router';
import { ApartmentService } from '../apartment.service';
import { CurrencyPipe } from '@angular/common';
import { Error } from "../../error/error";
import { Loading } from "../../loading/loading";

@Component({
  selector: 'app-apartment-detail',
  imports: [CardModule, CommentBox, CurrencyPipe, Error, Loading],
  templateUrl: './apartment-detail.html',
})
export class ApartmentDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly apartmentService = inject(ApartmentService);

  private readonly apartmentId = parseInt(this.route.snapshot.paramMap.get('id') ?? '');

  private apartmentResource = resource({
    params: () => this.apartmentId,
    loader: async ({ params: id }) => {
      const data = await this.apartmentService.fetchApartmentsDetailsById(id);
      return data;
    },
  });

  readonly apartment = computed(() => this.apartmentResource?.value());
  readonly isLoading = computed(() => this.apartmentResource?.isLoading());
  readonly error = computed(() => this.apartmentResource?.error());

  onAddingComment() {
    this.apartmentResource.reload();
  }
}
