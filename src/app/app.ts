import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { UserService } from './user/user.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
})
export class App {
  private router = inject(Router);
  private userService = inject(UserService);
  protected readonly title = signal('RentHub');
  protected readonly isAuthenticated = this.userService.isAuthenticated;

}
