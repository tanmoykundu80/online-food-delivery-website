import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';

@Component({
  selector: 'app-admin-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent {
  authForm: FormGroup;
  isLoginMode = true;
  error = '';

  constructor(
    private fb: FormBuilder,
    private adminService: AdminAuthService, // ✅ fixed service injection
    private router: Router
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['']
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    const { email, password, name } = this.authForm.value;
    const admin = { email, password, name };

    if (this.isLoginMode) {
      this.adminService.login(admin).subscribe(
        (res: boolean) => res ? this.router.navigate(['/admin-dashboard']) : this.error = 'Invalid login.', // ✅ typed `res`
        () => this.error = 'Login error.'
      );
    } else {
      this.adminService.register(admin).subscribe(
        (res: boolean) => res ? this.router.navigate(['/admin-dashboard']) : this.error = 'Signup failed.', // ✅ typed `res`
        () => this.error = 'Signup error.'
      );
    }
  }
}
