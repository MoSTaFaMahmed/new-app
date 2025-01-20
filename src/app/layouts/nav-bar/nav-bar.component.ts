import { Component, OnInit } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { ScreenSizeService } from '@core/services/utilites/screen-size.service';
import { CartService } from '@core/services/cart.service';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgIf, AsyncPipe,RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isMobile: boolean = false;
  isMenuOpen = false;
  cartCount$!: Observable<number>;

  constructor(
    private screenSizeService: ScreenSizeService,
    private cartService: CartService
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
}
