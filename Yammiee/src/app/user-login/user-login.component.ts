import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  isLoginMode = true;
  authForm!: FormGroup;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cartService: CartService

  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.authForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    }, {
      validators: !this.isLoginMode ? this.passwordMatchValidator : undefined
    });

    if (this.isLoginMode) {
      this.authForm.removeControl('name');
      this.authForm.removeControl('confirmPassword');
    }
  }

  passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.clearMessage();
    this.createForm();
  }

  onSubmit(): void {
  if (this.authForm.invalid) {
    this.message = 'Please fill all required fields correctly';
    this.messageType = 'error';
    this.markFormGroupTouched(this.authForm);
    return;
  }

  this.isLoading = true;
  this.clearMessage();
  const user: User = this.authForm.value;

  if (this.isLoginMode) {
    this.authService.login(user).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.message = 'Login successful!';
        this.messageType = 'success';

        // Save login state
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userName', res.name || res.email || user.email);

        // 🟢 Migrate guest cart to user's cart table
        this.cartService.migrateGuestCartToUser(user.email);

        // 🟢 Load user-specific cart from DB
        this.cartService.loadUserCartFromServer(user.email);

        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
        this.message = err.error?.message || 'Invalid email or password';
        this.messageType = 'error';
      }
    });
  } else {
    this.authService.register(user).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.message = 'Account created successfully!';
        this.messageType = 'success';

        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userName', res.name || user.name || user.email);

        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
        this.message = err.error?.message || 'Registration failed';
        this.messageType = 'error';
      }
    });
  }
}


  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  clearMessage() {
    this.message = '';
    this.messageType = '';
  }
}
