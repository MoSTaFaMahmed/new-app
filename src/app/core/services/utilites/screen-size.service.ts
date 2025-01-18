import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  private mobileBreakpoint = 768;
  private isMobileSubject = new BehaviorSubject<boolean>(window.innerWidth < this.mobileBreakpoint);

  isMobile$ = this.isMobileSubject.asObservable();

  constructor() {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  private onResize() {
    const isMobile = window.innerWidth < this.mobileBreakpoint;
    this.isMobileSubject.next(isMobile);
  }

  isMobile(): boolean {
    return this.isMobileSubject.value;
  }
}
