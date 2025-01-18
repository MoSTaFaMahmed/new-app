import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CartService } from '@core/services/cart.service';

@Injectable({
  providedIn: 'root',
})
export class CartGuard implements CanActivate {
  constructor(private cartService: CartService, private router: Router) {}

  canActivate(): boolean {
    if (this.cartService.hasItemsInCart()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
