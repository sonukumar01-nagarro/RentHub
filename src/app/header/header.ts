import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { getInitialsFofEmail } from '../utilities/shared-utility';
import { UserService } from '../user/user.service';
import { UpperCasePipe } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { label } from '@primeuix/themes/aura/metergroup';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [ButtonModule, AvatarModule, MenuModule, UpperCasePipe, RouterLink],
  templateUrl: './header.html',
})
export class Header {
  userService = inject(UserService);

  isDarkMode = signal(true);
  currentUser = this.userService.currentUser;

  menuItems = signal<MenuItem[]>([
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: async () => await this.userService.logout(),
    },
  ]);

  toggleDarkMode() {
    this.isDarkMode.update((prev) => !prev);
    const element = document.querySelector('html');
    if (element) element.classList.toggle('app-dark');
  }

  getInitialsForAvatar() {
    const email = this.currentUser()?.email;
    if (email) {
      return getInitialsFofEmail(email);
    }
    return '';
  }
}
