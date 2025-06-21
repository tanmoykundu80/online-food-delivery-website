import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service'; // ✅ Import CartService

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isLoggedIn = false;
  userName = 'Profile';

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.checkLoginState();
    this.router.events.subscribe(() => this.checkLoginState());
  }

  checkLoginState() {
    this.isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    this.userName = localStorage.getItem('userName') || 'Profile';
  }

  logout() {
  if (!confirm('Are you sure you want to logout? Your cart will be saved.')) return;

    const email = localStorage.getItem('userName') || '';

    const proceedWithLogout = () => {
    localStorage.setItem('userLoggedIn', 'false');
    localStorage.removeItem('userName');
    localStorage.removeItem('cartItems'); // ✅ clear only user cart
    this.cartService.updateCartCount();
    this.router.navigate(['/login']);
  };

  if (email) {
    this.cartService.saveUserCart(email).subscribe({
      next: () => proceedWithLogout(),
      error: (err: any) => {
        console.error('Error saving cart on logout:', err);
        alert('Failed to save your cart data. Logging out anyway.');
        proceedWithLogout();
      }
    });
  } else {
    proceedWithLogout();
  }
}
}