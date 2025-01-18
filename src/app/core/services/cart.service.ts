import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { CourseItem } from '@core/models/courses.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private CART_STORAGE_KEY = 'cart_items';

  private cartItems = new BehaviorSubject<CourseItem[]>(this.getCartFromStorage());
  cartItems$ = this.cartItems.asObservable();
  cartCount$ = this.cartItems$.pipe(map(items => items.length));

  constructor() {}

  private getCartFromStorage(): CourseItem[] {
    const storedCart = localStorage.getItem(this.CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  }

  private updateCartStorage(cart: CourseItem[]): void {
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(cart));
  }

  addToCart(course: CourseItem): void {
    const currentCart = this.cartItems.value;
    if (!currentCart.find((item) => item.id === course.id)) {
      const updatedCart = [...currentCart, course];
      this.cartItems.next(updatedCart);
      this.updateCartStorage(updatedCart);
    }
  }

  removeFromCart(courseId: number): void {
    const updatedCart = this.cartItems.value.filter((item) => item.id !== courseId);
    this.cartItems.next(updatedCart);
    this.updateCartStorage(updatedCart);
  }

  clearCart(): void {
    this.cartItems.next([]);
    localStorage.removeItem(this.CART_STORAGE_KEY);
  }
  isCourseInCart(courseId: number): boolean {
    return this.cartItems.value.some(item => item.id === courseId);
  }

  hasItemsInCart(): boolean {
    return this.cartItems.value.length > 0;
  }

  getCartItems(): CourseItem[] {
    return this.cartItems.value;
  }

}
