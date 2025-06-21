import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {
  constructor(private router: Router, private http: HttpClient) {}

  // ✅ Check if admin is logged in
  isAdminLoggedIn(): boolean {
    return !!localStorage.getItem('adminToken');
  }

  // ✅ Logout admin and redirect to home
  logout(): void {
    this.http.post('https://localhost:7182/api/Admin/logout', {}).subscribe({
      next: () => {
        localStorage.removeItem('adminToken');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Logout failed:', err);
        localStorage.removeItem('adminToken'); // remove anyway for safety
        this.router.navigate(['/home']);
      }
    });
  }
}
