import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';

import { LoginModel } from './login.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  imports: [
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    MessageModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly errorMessage = signal('');
  readonly isSubmitted = signal(false);
  loginForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/),
    ]),
  });

  async onSubmit() {
    if (this.loginForm.valid) {
      const loginData: LoginModel = this.loginForm.value as LoginModel;
      try {
        await this.userService.login(loginData);
        this.isSubmitted.set(false);
        const navigateToUrl = this.route.snapshot.queryParams['returnUrl'] ?? '/apartments';
        console.log(navigateToUrl);
        this.router.navigate([navigateToUrl]);
      } catch (error) {
        this.errorMessage.set(error instanceof Error ? error.message : 'Login failed');
      }
    }
  }
}
