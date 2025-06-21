import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodService } from '../services/food.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-menu-catalogue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-catalogue.component.html',
  styleUrls: ['./menu-catalogue.component.css']
})
export class MenuCatalogueComponent implements OnInit {
  foodItems: any[] = [];
  filteredFoodItems: any[] = [];
  selectedCategory: string = 'All';
  categories: string[] = ['Snacks', 'Main Course', 'Mughlai', 'Drinks', 'Desserts', 'Chinese'];

  constructor(private foodService: FoodService, private cartService: CartService) {}

  ngOnInit(): void {
    this.foodItems = this.foodService.getFoodItems().map(item => ({ ...item, quantity: 1 }));
    this.filteredFoodItems = [...this.foodItems];
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredFoodItems = [...this.foodItems];
    } else {
      this.filteredFoodItems = this.foodItems.filter(food => food.category === category);
    }
  }

  increaseQuantity(food: any) {
    food.quantity += 1;
  }

  decreaseQuantity(food: any) {
    if (food.quantity > 1) food.quantity -= 1;
  }

  addToCart(food: any) {
    this.cartService.addToCart(food);
    alert(`${food.food_Name} added to cart!`);
  }
}
