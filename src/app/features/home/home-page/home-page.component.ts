import { Component } from '@angular/core';
import { BannerComponent } from '../component/banner/banner.component';
import { GalleryComponent } from '../component/gallery/gallery.component';
import { ScreenSizeService } from '@core/services/utilites/screen-size.service';
import { CoursesComponent } from '../component/courses/courses.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [BannerComponent,GalleryComponent,CoursesComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  isMobile: boolean = false;
  isTablet: boolean = false;
  currentSlide: number = 0;
  intervalId: any;

  constructor(private screenSizeService: ScreenSizeService) {}

  ngOnInit() {
    this.isMobileChecking();
    this.isTabletChecking();
  }


  isMobileChecking() {
    this.isMobile = this.screenSizeService.isMobile();
    this.screenSizeService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }

  isTabletChecking() {
    this.isTablet = this.screenSizeService.isTablet();
    this.screenSizeService.isTablet$.subscribe((isTablet) => {
      this.isTablet = isTablet;
    });
  }
}
