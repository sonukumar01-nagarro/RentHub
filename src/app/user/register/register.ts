import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';

import { RegisterModel } from '../register/register.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    MessageModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.html',
})
export class Register {
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  readonly errorMessage = signal('');
  readonly isSubmitted = signal(false);

  registerForm = this.fb.group(
    {
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      password: this.fb.control<string>('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/),
      ]),
      confirmPassword: this.fb.control<string>('', Validators.required),
    },
    { validators: this.passwordMatchValidator.bind(this) },
  );

  async onSubmit() {
    this.isSubmitted.set(true);
    if (this.registerForm.valid) {
      const registerData: RegisterModel = this.registerForm.value as RegisterModel;
      try {
        await this.userService.register(registerData);
        this.isSubmitted.set(false);
        this.router.navigate(['apartments']);
      } catch (error) {
        this.errorMessage.set(error instanceof Error ? error.message : 'Registration failed');
      }
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMissMatch: true };
    } else {
      return null;
    }
  }
}
