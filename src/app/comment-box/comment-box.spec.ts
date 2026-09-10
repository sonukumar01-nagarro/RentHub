import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentBox } from './comment-box';

describe('CommentBox', () => {
  let component: CommentBox;
  let fixture: ComponentFixture<CommentBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentBox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
