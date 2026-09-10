import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentListing } from './apartment-listing';

describe('ApartmentListing', () => {
  let component: ApartmentListing;
  let fixture: ComponentFixture<ApartmentListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApartmentListing],
    }).compileComponents();

    fixture = TestBed.createComponent(ApartmentListing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
