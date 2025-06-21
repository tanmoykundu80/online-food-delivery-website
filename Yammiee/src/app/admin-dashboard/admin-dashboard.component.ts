import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { FoodService } from '../services/food.service';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AdminNavbarComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
  currentPage = 1;
  pageSize = 10;
  totalUsers = 0;

  admins: any[] = [];

  foodItems: any[] = [];
  newFood: any = {
    food_Name: '',
    category: '',
    price: null,
    imgfile: null,
    previewUrl: ''
  };

  orders: any[] = [];
  orderStatuses: string[] = ['Pending', 'Preparing', 'Out for Delivery', 'Delivered'];

  activeTab: string = 'users';
  orderSearch: string = '';
  userSearch: string = '';

  constructor(
    private http: HttpClient,
    private foodService: FoodService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadAdmins();
    this.loadFoodItems();
    this.loadOrders();
  }

  loadUsers(): void {
    const params = new HttpParams()
      .set('pageNumber', this.currentPage)
      .set('pageSize', this.pageSize);

    this.http.get<any>('https://localhost:7063/api/User/GetUsersPaged', { params })
      .subscribe(data => {
        this.users = data.users;
        this.totalUsers = data.totalCount;
      });
  }

  deleteUser(email: string): void {
    if (confirm(`Are you sure you want to delete the user with email ${email}?`)) {
      this.http.delete<{ message: string }>('https://localhost:7063/api/User/DeleteUserByEmail', {
        params: new HttpParams().set('email', email)
      }).subscribe({
        next: (response) => {
          alert(response.message);
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          alert('Failed to delete user.');
        }
      });
    }
  }

  loadAdmins(): void {
    this.http.get<any>('https://localhost:7063/api/Admin/ShowAdmins')
      .subscribe(data => {
        this.admins = data;
      });
  }

  deleteAdmin(email: string): void {
    if (confirm(`Are you sure you want to delete the admin with email ${email}?`)) {
      this.http.delete<{ message: string }>(`https://localhost:7063/api/Admin/Delete/${email}`)
        .subscribe({
          next: (res) => {
            alert(res.message || 'Admin deleted successfully.');
            this.loadAdmins();
          },
          error: (error) => {
            console.error('Error deleting admin:', error);
            alert('Failed to delete admin.');
          }
        });
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadUsers();
  }

  get totalPages(): number[] {
    return Array(Math.ceil(this.totalUsers / this.pageSize)).fill(0).map((_, i) => i + 1);
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newFood.imgfile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.newFood.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onAddFood(): void {
    if (!this.newFood.food_Name || !this.newFood.category || !this.newFood.price) {
      alert('Please fill all required fields.');
      return;
    }

    this.foodService.addFoodItem({ ...this.newFood });
    this.resetFoodForm();
    this.loadFoodItems();
  }

  onRemoveFood(index: number): void {
    this.foodService.removeFoodItem(index);
    this.loadFoodItems();
  }

  loadFoodItems(): void {
    this.foodItems = this.foodService.getFoodItems();
  }

  resetFoodForm(): void {
    this.newFood = {
      food_Name: '',
      category: '',
      price: null,
      imgfile: null,
      previewUrl: ''
    };
  }

  loadOrders(): void {
    this.http.get<any[]>('https://localhost:7063/api/order/all').subscribe(data => {
      this.orders = data;
    });
  }

  updateOrderStatus(orderId: number, newStatus: string): void {
    const payload = {
      orderId: orderId,
      status: newStatus
    };

    this.http.put('https://localhost:7063/api/order/update-status', payload, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: () => {
        alert('Order status updated successfully.');
        this.loadOrders();
      },
      error: (err) => {
        console.error('Failed to update order status:', err);
        alert('Failed to update order status. Please try again.');
      }
    });
  }

  deleteOrder(orderId: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.http.delete(`https://localhost:7063/api/order/delete/${orderId}`).subscribe({
        next: () => {
          alert('Order deleted successfully.');
          this.loadOrders();
        },
        error: (err) => {
          console.error('Failed to delete order:', err);
          alert('Failed to delete order. Please try again.');
        }
      });
    }
  }

  filteredOrders(): any[] {
    if (!this.orderSearch.trim()) return this.orders;
    const search = this.orderSearch.toLowerCase();
    return this.orders.filter(order =>
      order.userEmail?.toLowerCase().includes(search) ||
      order.address?.toLowerCase().includes(search)
    );
  }

  filteredUsers(): any[] {
    if (!this.userSearch.trim()) return this.users;
    const search = this.userSearch.toLowerCase();
    return this.users.filter(user =>
      user.email?.toLowerCase().includes(search) ||
      user.name?.toLowerCase().includes(search)
    );
  }

  isAdminLoggedIn(): boolean {
    return !!localStorage.getItem('adminToken');
  }

  logout(): void {
    localStorage.removeItem('adminToken');
    this.router.navigate(['/admin-login']);
  }
}
