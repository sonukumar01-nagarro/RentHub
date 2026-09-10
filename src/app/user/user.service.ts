import { computed, inject, Injectable, signal } from '@angular/core';
import { RegisterModel } from './register/register.model';
import { userData } from '../mock-data/user-data';
import { LoginModel } from './login/login.model';
import { DisplayUser, UserData } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly router = inject(Router);

  private _currentUser = signal<DisplayUser | null>(null);
  readonly currentUser = this._currentUser.asReadonly();
  isAuthenticated = computed(() => !!this.currentUser());

  fetchNextAvailableId = () => userData.length;

  checkIfUserAlreadyExists = (email: string) => userData.find((user) => user.email === email);

  async register(user: RegisterModel): Promise<DisplayUser> {
    if (this.checkIfUserAlreadyExists(user.email)) {
      throw new Error('User already exists');
    }
    const newUser: UserData = {
      id: this.fetchNextAvailableId(),
      email: user.email,
      role: 'renter',
      password: user.password,
      favoriteApartments: [],
    };
    userData.push(newUser);

    this.setCurrentUser(newUser);
    return this.currentUser() as DisplayUser;
  }

  async login(loginUser: LoginModel): Promise<DisplayUser> {
    if (!this.checkIfUserAlreadyExists(loginUser.email)) {
      new Error("User doesn't exist, please register first");
    }
    const user = userData.find(
      (user) =>
        user.email.toLowerCase() === loginUser.email.toLowerCase() &&
        user.password === loginUser.password,
    );
    if (user) {
      this.setCurrentUser(user);
      return this.currentUser() as DisplayUser;
    } else {
      throw new Error('Invalid email or password');
    }
  }

  async updateFavoriteList(email: string, apartmentIds: number[]) {
    const user = userData.find((user) => user.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      throw new Error('Invalid user');
    }
    user.favoriteApartments = [...apartmentIds];
  }

  logout() {
    this._currentUser.set(null);
    this.router.navigate(['/login']);
  }

  private setCurrentUser(user: UserData): void {
    const displayUserData: DisplayUser = {
      email: user.email,
      role: user.role,
      favoriteApartments: user.favoriteApartments,
    };
    this._currentUser.set(displayUserData);
  }
}
