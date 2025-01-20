import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BannerItem, Banners } from '@core/models/banner.model';
import { HomeDataService } from '@core/services/home.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [NgIf, NgFor, SlicePipe],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent implements OnInit, OnDestroy, AfterViewInit{
  @Input() isTablet: boolean = false;
  banners: BannerItem[] = [];
  currentSlide: number = 0;
  intervalId: any;
  isLoading: boolean = true;
  private destroy$ = new Subject<void>();

  constructor(private homeDataService: HomeDataService) {}

  ngAfterViewInit(): void {
    this.loadBanners();
  }

  ngOnInit() {

  }

  loadBanners() {
    this.homeDataService
      .getBanners()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: Banners) => {
          this.banners = res.banners;
          this.startAutoSlide();
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }


  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.banners.length;
  }

  prevSlide() {
    this.currentSlide =
      this.currentSlide === 0 ? this.banners.length - 1 : this.currentSlide - 1;
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
}
