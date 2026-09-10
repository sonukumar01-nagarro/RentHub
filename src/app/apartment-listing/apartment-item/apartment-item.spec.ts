import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentItem } from './apartment-item';

describe('ApartmentItem', () => {
  let component: ApartmentItem;
  let fixture: ComponentFixture<ApartmentItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApartmentItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApartmentItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
