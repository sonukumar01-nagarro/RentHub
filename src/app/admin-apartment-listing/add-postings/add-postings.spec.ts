import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostings } from './add-postings';

describe('AddPostings', () => {
  let component: AddPostings;
  let fixture: ComponentFixture<AddPostings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPostings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPostings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
