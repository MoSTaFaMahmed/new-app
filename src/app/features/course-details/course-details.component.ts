import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseItem } from '@core/models/courses.model';
import { CartService } from '@core/services/cart.service';
import { ToastService } from '@core/services/utilites/toast.service';


@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss',
})
export class CourseDetailsComponent {
  course!: CourseItem;
  isCourseInCart: boolean = false;

    constructor(
      private cartService: CartService,
      private toastService: ToastService,
      private router: Router
    ) {}

  ngOnInit(): void {
    this.course = history.state.course;
    this.checkIfCourseInCart();
  }

  checkIfCourseInCart(): void {
    this.isCourseInCart = this.cartService.isCourseInCart(this.course.id);
  }

  addToCart(): void {
    this.toastService.showToast('Added Successfully', 'success');
    this.cartService.addToCart(this.course);
    this.checkIfCourseInCart();
  }

  removeFromCart(): void {
    if (this.isCourseInCart) {
      this.cartService.removeFromCart(this.course.id);
      this.isCourseInCart = false;
      this.toastService.showToast('Removed from cart', 'success');
    }
  }

  byNow(){
    if(!this.cartService.hasItemsInCart()){
      this.toastService.showToast('please add at least one Item to cart', 'error');
      return;
    }
    this.router.navigate(['/cart'])

  }

}
