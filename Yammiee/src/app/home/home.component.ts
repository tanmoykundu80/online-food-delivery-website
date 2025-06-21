import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  recipes = [
    {
      id: 1,
      title: 'Biriyani',
      description: 'Indulge in aromatic, slow-cooked biriyani layered with rich spices and love — the signature taste of meal.',
      image: 'http://codularity.in/wp-content/uploads/2025/05/Biriyani.jpg'
    },
    {
      id: 2,
      title: 'Chinese',
      description: 'Authentic Chinese flavors served with heart—classic dishes, bold spices, and unforgettable taste in every bite.',
      image: 'http://codularity.in/wp-content/uploads/2025/05/chinese-food.jpg'
    },
    {
      id: 3,
      title: 'Bengali Food',
      description: 'Authentic Bengali flavors served with heart—where every dish tells a story of tradition and spice.',
      image: 'http://codularity.in/wp-content/uploads/2025/05/bengali-food.jpg'
    }
  ];

  reviews = [
    { name: 'Tanmoy', message: 'The best food delivery experience ever!' },
    { name: 'Kuntal', message: 'The recipes are so easy to follow and delicious.' },
    { name: 'Subhayan', message: 'Great quality, fast service, and amazing taste.' }
  ];

  goToBiriyaniBlog(id: number) {
    this.router.navigate(['/biriyani-blog', id]);
  }

  goToChineseBlog(id: number) {
    this.router.navigate(['/chinese-blog', id]);
  }

  goToBengaliBlog(id: number) {
    this.router.navigate(['/bengali-food-blog', id]);
  }

  subscribe(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = (form.querySelector('input[name="email"]') as HTMLInputElement).value;
    alert(`Thanks for subscribing with ${email}!`);
    form.reset();
  }
}
