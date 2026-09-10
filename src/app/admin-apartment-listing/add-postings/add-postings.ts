import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { Textarea } from 'primeng/textarea';

import { ApartmentService } from '../../apartment-listing/apartment.service';
import { Apartment } from '../../apartment-listing/apartment';
import { NgTemplateOutlet } from '@angular/common';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-add-postings',
  imports: [
    InputTextModule,
    ButtonModule,
    SelectModule,
    CheckboxModule,
    RadioButtonModule,
    Textarea,
    CardModule,
    ReactiveFormsModule,
    NgTemplateOutlet,
  ],
  templateUrl: './add-postings.html',
})
export class AddPostings {
  private readonly fb = inject(FormBuilder);
  private readonly apartmentService = inject(ApartmentService);
  private readonly userService = inject(UserService);

  propertyTypeOptions = signal(['Building', 'Apartment']);
  amenities = signal([
    'Gym',
    'Power Backup',
    'gated Security',
    'Swimming Pool',
    'Garbage Disposal',
    'Laundry Service',
    'Car Parking',
    'Private Lawn',
    'Elevator',
    'Visitor Parking',
    'Club House',
  ]);

  postPropertyForm = this.fb.group({
    propertyType: this.fb.control<string>('', Validators.required),
    propertyName: this.fb.control<string>('', Validators.required),
    isSharedProperty: this.fb.control<string>('', Validators.required),
    propertyLocation: this.fb.control<string>('', Validators.required),
    propertyArea: this.fb.control<string>('', Validators.required),
    stayType: this.fb.control<string>(''),
    expectedRent: this.fb.control<string>('', Validators.required),
    isNegotiable: this.fb.control<boolean>(false),
    isFurnished: this.fb.control<string>('', Validators.required),
    amenities: this.fb.control<string[]>([], [Validators.required, Validators.minLength(1)]),
    title: this.fb.control<string>('', Validators.required),
    description: this.fb.control<string>('', Validators.required),
  });

  isSubmitted = signal(false);

  onSubmit() {
    this.isSubmitted.set(true);
    if (this.postPropertyForm.invalid) {
      this.postPropertyForm.markAllAsTouched();
      return;
    }
    const apartmentPayload = this.getApartmentPayload();
    this.apartmentService.postApartment(apartmentPayload);
  }

  onAmenityChange(event: CheckboxChangeEvent) {
    const checked = event.checked;
    this.postPropertyForm.get('amenities')?.setValue(checked);
  }

  private getApartmentPayload() {
    const apartmentFormValue = this.postPropertyForm.value;
    const length = this.apartmentService.length();
    const imagePrefix = (length % 6) + 1;
    const email = this.userService.currentUser()?.email;
    return {
      id: length,
      name: apartmentFormValue.propertyName,
      title: apartmentFormValue.title,
      type: apartmentFormValue.propertyType,
      image: `apartment-${imagePrefix}.jpg`,
      rent: +(apartmentFormValue.expectedRent ?? 0),
      location: apartmentFormValue.propertyLocation,
      description: apartmentFormValue.description,
      isShared: !!apartmentFormValue.isSharedProperty,
      areaInSqFeet: apartmentFormValue.propertyArea,
      isFurnished: !!apartmentFormValue.isFurnished,
      amenities: apartmentFormValue.amenities,
      stayType: apartmentFormValue.stayType,
      isNegotiable: !!apartmentFormValue.isNegotiable,
      comments: [],
      owner: email,
    } as Apartment;
  }
}
