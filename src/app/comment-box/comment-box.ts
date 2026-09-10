import { Component, inject, input, output, signal } from '@angular/core';

import { TextareaModule } from 'primeng/textarea';
import { ButtonDirective } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

import { UserService } from '../user/user.service';
import { CommentDetails } from './comment.model';
import { getInitialsFofEmail } from '../utilities/shared-utility';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApartmentService } from '../apartment-listing/apartment.service';

@Component({
  selector: 'app-comment-box',
  imports: [TextareaModule, ButtonDirective, AvatarModule, UpperCasePipe, FormsModule],
  templateUrl: './comment-box.html',
})
export class CommentBox {
  userService = inject(UserService);
  apartmentService = inject(ApartmentService);

  apartmentId = input<number>();
  comments = input<Array<CommentDetails>>([]);

  onAddComment = output();

  currentUser = this.userService.currentUser;
  comment = '';

  getInitialsForAvatar(email: string) {
    return getInitialsFofEmail(email);
  }

  onPostComment() {
    const apartmentId = this.apartmentId();
    const email = this.currentUser()?.email;
    if (!apartmentId || !email || !this.comment) {
      return;
    }
    this.apartmentService.postCommentForApartment(apartmentId, email, this.comment);
    this.onAddComment.emit();
    this.comment = '';
  }
}
