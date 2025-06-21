import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminAuthComponent } from './admin-auth/admin-auth.component';
import { MenuCatalogueComponent } from './menu-catalogue/menu-catalogue.component';
import { BiriyaniBlogComponent } from './biriyani-blog/biriyani-blog.component';
import { ChineseBlogComponent } from './chinese-blog/chinese-blog.component'; 
import { BengaliFoodBlogComponent } from './bengali-food-blog/bengali-food-blog.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

export const routes: Routes = [
  // ✅ Home (standalone)
  { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },

  // ✅ Other Standalone Pages
  { path: 'contact', loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent) },
  { path: 'login', loadComponent: () => import('./user-login/user-login.component').then(m => m.UserLoginComponent) },
  { path: 'about', loadComponent: () => import('./about/about.component').then(m => m.AboutComponent) },
  { path: 'privacy-policy', loadComponent: () => import('./privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent) },
  { path: 'cart', loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent) },
  { path: 'terms', loadComponent: () => import('./terms/terms.component').then(m => m.TermsComponent) },
  { path: 'menu', loadComponent: () => import('./menu-catalogue/menu-catalogue.component').then(m => m.MenuCatalogueComponent) },
  { path: 'admin', loadComponent: () => import('./admin-auth/admin-auth.component').then(m => m.AdminAuthComponent) },
  { path: 'orders', component: OrderHistoryComponent },

  // ✅ Eager-loaded Components
  { path: 'admin-auth', component: AdminAuthComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },

  // ✅ Blog Page (checkout)
  { path: 'biriyani-blog/:id', component: BiriyaniBlogComponent },
  { path: 'chinese-blog/:id', component: ChineseBlogComponent },
  { path: 'bengali-food-blog/:id', component: BengaliFoodBlogComponent },

  // ✅ Wildcard route (optional fallback)
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
