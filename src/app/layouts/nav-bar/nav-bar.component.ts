import { Component, OnInit } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { ScreenSizeService } from '@core/services/utilites/screen-size.service';
import { CartService } from '@core/services/cart.service';
import { Observable } from 'rxjs';
import { ToastService } from '@core/services/utilites/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isMobile: boolean = false;
  isMenuOpen = false;
  cartCount$!: Observable<number>;

  constructor(
    private screenSizeService: ScreenSizeService,
    private cartService: CartService,
    private toastService : ToastService,
    private router : Router
  ) {}

  ngOnInit() {
    this.isMobileChecking();
    this.cartCount$ = this.cartService.cartCount$;
  }

  isMobileChecking() {
    this.isMobile = this.screenSizeService.isMobile();
    this.screenSizeService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goToCart(){
    if(!this.cartService.hasItemsInCart()){
      this.toastService.showToast('please add at least one Item to cart', 'error');
      return;
    }
    this.router.navigate(['/cart'])

  }

}
