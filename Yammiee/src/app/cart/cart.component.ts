import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

declare var Razorpay: any;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  address: string = '';
  showAddressForm: boolean = false;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  get total(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  increaseQuantity(index: number): void {
    this.cartItems[index].quantity++;
    this.updateCart();
  }

  decreaseQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
    } else {
      this.cartItems.splice(index, 1);
    }
    this.updateCart();
  }

  updateCart(): void {
    this.cartService.setCartItems(this.cartItems);
  }

  handlePayNow(): void {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';

    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    this.showAddressForm = true;
  }

  confirmAddressAndPay(): void {
    if (!this.address.trim()) {
      alert('Please enter a valid address.');
      return;
    }

    this.payWithRazorpay();
  }

  payWithRazorpay(): void {
    const options = {
      key: 'Your Razorpay Key',
      amount: this.total * 100,
      currency: 'INR',
      name: 'Yammiee',
      description: `Order Payment (Delivery to: ${this.address})`,
      handler: (response: any) => {
        const email = localStorage.getItem('userName') || '';
        const cartItems = this.cartItems;

        // Save order to server after successful payment
        this.cartService.saveOrder(email, this.address, cartItems).subscribe({
          next: () => {
            alert('Payment successful! Order saved. Razorpay ID: ' + response.razorpay_payment_id);
            localStorage.removeItem('cartItems');
            this.loadCart();
            this.cartService.updateCartCount();
            this.showAddressForm = false;
            this.address = '';
          },
          error: () => {
            alert('Payment succeeded but order saving failed.');
          }
        });
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#ff6f00'
      }
    };

    const razorpay = new Razorpay(options);
    razorpay.open();
  }
}
