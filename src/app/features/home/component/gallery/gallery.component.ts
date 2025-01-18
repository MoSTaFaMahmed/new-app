import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SliderItem, Sliders } from '@core/models/sliders.model';
import { HomeDataService } from '@core/services/home.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [NgStyle,NgFor,NgIf],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  @Input() isMobile: boolean = false;
  currentImgIndx !: number;
  sliderTransform: string = 'translateX(0%)';

  images: SliderItem[] = [];
  selectedImage !: string;
  nextToSelectedImage !: string;
  currentIndex: number = 0;
  startX: number = 0;
  isDragging: boolean = false;
  autoSlideInterval: any;
  isLoading: boolean = true;
  private destroy$ = new Subject<void>();

  constructor(private homeDataService : HomeDataService){}

  ngOnInit() {
    this.loadSliders();
  }

loadSliders() {
    this.homeDataService
      .getSliders()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: Sliders) => {
          if(res?.Slider.length){
            this.images = res.Slider;
            this.selectedImage = this.images[0].image;
            this.nextToSelectedImage = this.images[1].image;
            this.startAutoSlide();
          }
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000); // Change every 3 seconds
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.selectedImage = this.images[this.currentIndex].image;
    if(this.currentIndex < this.images.length - 1){
      this.nextToSelectedImage = this.images[this.currentIndex + 1].image;
    }else{
      this.nextToSelectedImage = this.images[0].image;
    }
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.selectedImage = this.images[this.currentIndex].image;
    if(this.currentIndex < this.images.length - 1){
      this.nextToSelectedImage = this.images[this.currentIndex + 1].image;
    }else{
      this.nextToSelectedImage = this.images[0].image;
    }
  }




  getSlideStyle(index: number) {
    this.currentImgIndx = index ;
    const relativeIndex = (index - this.currentIndex + this.images.length) % this.images.length;
    const baseWidth = 442;
    const baseHeight = 444;

    const widthAdjustment = (relativeIndex * 120);
    const heightAdjustment = -(relativeIndex * 80);
    const width = baseWidth + widthAdjustment;
    const height = baseHeight + heightAdjustment;

    const topAdjustment = (baseHeight - height) / 2;
    const leftAdjustment = -(widthAdjustment / 2);
    return {
      'width': `${width}px`,
      'height': `${height}px`,
      'left': `${151 - relativeIndex  + leftAdjustment}px`,
      'top': `${topAdjustment}px`,
      'opacity': `${1 - relativeIndex * 0.4}`,
      'z-index': `${this.images.length - relativeIndex}`,
      'border-radius': '20px',
      'background-image': `url(${this.images[index].image})`,
      'background-size': 'cover',
      'background-position': 'center',
    };
  }


  ngOnDestroy() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

}
