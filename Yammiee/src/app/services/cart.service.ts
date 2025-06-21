import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItemCount = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCount.asObservable();
  private apiUrl = 'https://localhost:7063/api/cart';

  constructor(private http: HttpClient) {
    this.updateCartCount();
  }

  private getCartKey(): string {
    return localStorage.getItem('userLoggedIn') === 'true' ? 'cartItems' : 'guestCart';
  }

  getCartItems(): any[] {
    const key = this.getCartKey();
    const items = JSON.parse(localStorage.getItem(key) || '[]');
    return items.map((item: any) => ({ ...item })); // avoid reference issues
  }

  setCartItems(items: any[]) {
    const key = this.getCartKey();
    localStorage.setItem(key, JSON.stringify(items));
    this.updateCartCount();
  }

  addToCart(item: any) {
    const cart = this.getCartItems();

    // Normalize & clone to avoid reference bugs
    const itemId = item.id || item.food_Id || Math.floor(Math.random() * 100000);
    const itemName = item.name || item.food_Name || 'Unnamed';

    const existing = cart.find((i: any) => i.id === itemId);

    if (existing) {
      existing.quantity += item.quantity || 1;
    } else {
      const newItem = {
        id: itemId,
        name: itemName,
        price: item.price,
        quantity: item.quantity || 1
      };

      cart.push(JSON.parse(JSON.stringify(newItem))); // deep clone
    }

    this.setCartItems(cart);
  }

  updateQuantity(itemId: number, quantity: number) {
    const cart = this.getCartItems();
    const item = cart.find(i => i.id === itemId || i.food_Id === itemId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(itemId);
      } else {
        this.setCartItems(cart);
      }
    }
  }

  removeFromCart(itemId: number) {
    const cart = this.getCartItems().filter((item: any) => item.id !== itemId && item.food_Id !== itemId);
    this.setCartItems(cart);
  }

  clearCart() {
    localStorage.removeItem(this.getCartKey());
    this.updateCartCount();
  }

  updateCartCount() {
    const cart = this.getCartItems();
    const total = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
    this.cartItemCount.next(total);
  }

  saveUserCart(email: string) {
    const cart = this.getCartItems();
    const itemsWithUser = cart.map((item: any) => ({
      id: 0,
      userEmail: email,
      itemName: item.name,
      quantity: item.quantity,
      price: item.price
    }));
    return this.http.post(`${this.apiUrl}/SaveCartItems`, itemsWithUser);
  }

  fetchUserCart(email: string) {
    return this.http.get<any[]>(`${this.apiUrl}/GetCartItems/${email}`);
  }

  loadUserCartFromServer(email: string) {
    this.fetchUserCart(email).subscribe(serverCart => {
      const normalizedCart = serverCart.map((item: any) => ({
        name: item.itemName || item.name || 'Unnamed',
        price: item.price,
        quantity: item.quantity,
        id: item.foodId || item.id || Math.floor(Math.random() * 100000)
      }));
      localStorage.setItem('cartItems', JSON.stringify(normalizedCart));
      this.updateCartCount();
    });
  }

  migrateGuestCartToUser(email: string) {
    const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
    if (guestCart.length === 0) return;
    const itemsWithUser = guestCart.map((item: any) => ({
      userEmail: email,
      itemName: item.name,
      price: item.price,
      quantity: item.quantity
    }));
    this.http.post(`${this.apiUrl}/SaveCartItems`, itemsWithUser).subscribe(() => {
      // You can clear guestCart if desired
      this.updateCartCount();
    });
  }

  saveOrder(email: string, address: string, items: any[]) {
    const orderPayload = {
      userEmail: email,
      address: address,
      items: items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    };
    return this.http.post('https://localhost:7063/api/order/save', orderPayload);
  }

  fetchOrders(email: string) {
    return this.http.get<any[]>(`https://localhost:7063/api/order/getByUser/${email}`);
  }
}
