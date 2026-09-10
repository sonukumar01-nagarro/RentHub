import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApartmentListing } from './admin-apartment-listing';

describe('AdminApartmentListing', () => {
  let component: AdminApartmentListing;
  let fixture: ComponentFixture<AdminApartmentListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminApartmentListing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminApartmentListing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
