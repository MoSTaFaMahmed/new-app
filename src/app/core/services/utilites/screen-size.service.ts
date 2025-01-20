import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  private mobileBreakpoint = 768;
  private isMobileSubject = new BehaviorSubject<boolean>(window.innerWidth < this.mobileBreakpoint);

  private tabletBreakpoint = 1400;
  private isTabletSubject = new BehaviorSubject<boolean>(window.innerWidth < this.tabletBreakpoint);

  isMobile$ = this.isMobileSubject.asObservable();

  isTablet$ = this.isTabletSubject.asObservable();

  constructor() {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  private onResize() {
    const isMobile = window.innerWidth < this.mobileBreakpoint;
    this.isMobileSubject.next(isMobile);

    const isTablet = window.innerWidth < this.tabletBreakpoint;
    this.isTabletSubject.next(isTablet);
  }

  isMobile(): boolean {
    return this.isMobileSubject.value;
  }

  isTablet(): boolean {
    return this.isTabletSubject.value;
  }
}
