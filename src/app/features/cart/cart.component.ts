import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseItem } from '@core/models/courses.model';
import { CartService } from '@core/services/cart.service';
import { ToastService } from '@core/services/utilites/toast.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartItems: CourseItem[] = [];

  constructor(
    private cartService: CartService,
    private toastService: ToastService,
     private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  get totalPrice(): string {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  }

  removeFromCart(course: CourseItem): void {
    this.cartService.removeFromCart(course.id);
    this.toastService.showToast('Removed from cart', 'success');
    this.cartItems = this.cartService.getCartItems();
    if (!this.cartItems.length) {
       this.router.navigate(['/']);
    }
  }
}
