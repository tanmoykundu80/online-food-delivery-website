import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  orders: any[] = [];
  isLoading: boolean = true;
  hasOrders: boolean = false;
  pollingSubscription!: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadOrders();

    // Auto-refresh every 10 seconds
    this.pollingSubscription = interval(10000).subscribe(() => {
      console.log('[Auto-Refresh] Triggered');
      this.loadOrders();
    });
  }

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

  loadOrders(): void {
    const email = localStorage.getItem('userName') || '';
    const apiUrl = `https://localhost:7063/api/order/getbyuser/${email}?t=${new Date().getTime()}`; // cache-busting

    this.http.get<any[]>(apiUrl).subscribe({
      next: (data: any[]) => {
        console.log('[Order History] Fetched Orders:', data);
        this.orders = data;
        this.hasOrders = data.length > 0;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('[Order History] Failed to fetch orders:', err);
        this.isLoading = false;
      }
    });
  }

  reloadOrders(): void {
    console.log('[Order History] Manual refresh triggered');
    this.isLoading = true;
    this.loadOrders();
  }
}
