import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private foodItems: any[] = [];

  constructor() {
    const stored = localStorage.getItem('foodItems');
    this.foodItems = stored ? JSON.parse(stored) : [];
  }

  getFoodItems(): any[] {
    return this.foodItems;
  }

  addFoodItem(item: any): void {
    this.foodItems.push(item);
    this.saveToStorage();
  }

  removeFoodItem(index: number): void {
    this.foodItems.splice(index, 1);
    this.saveToStorage();
  }

  private saveToStorage(): void {
    localStorage.setItem('foodItems', JSON.stringify(this.foodItems));
  }
}
