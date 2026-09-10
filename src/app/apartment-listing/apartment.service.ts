import { Injectable, signal } from '@angular/core';
import { apartmentData } from '../mock-data/apartment-data';
import { Apartment } from './apartment';

@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  readonly length = signal(apartmentData.length);

  async fetchApartments(): Promise<Apartment[]> {
    return new Promise((resolve) => setTimeout(() => resolve(apartmentData), 1000));
  }

  async fetchApartmentsByOwner(email: string): Promise<Apartment[]> {
    return new Promise((resolve) =>
      setTimeout(
        () => resolve(apartmentData.filter((apartment) => apartment.owner === email)),
        1000,
      ),
    );
  }

  async fetchApartmentsDetailsById(id: number): Promise<Apartment | undefined> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(apartmentData.find((apartment) => apartment.id === id)), 1000),
    );
  }

  async postApartment(apartment: Apartment) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    apartmentData.push(apartment);
  }

  async postCommentForApartment(apartmentId: number, author: string, message: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const apartment = apartmentData.find((x) => x.id === apartmentId);
    if (apartment) {
      const id = apartment.comments?.length ?? 0;
      if (!apartment.comments) {
        apartment.comments = [];
      }
      apartment.comments.push({ id, message, author });
    }
  }
}
