import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseItem } from '@core/models/courses.model';
import { CartService } from '@core/services/cart.service';
import { ToastService } from '@core/services/utilites/toast.service';
import { OrderSummaryComponent } from 'src/app/layouts/order-summary/order-summary.component';
import { OrderCompletedComponent } from './components/order-completed/order-completed.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NgFor,OrderSummaryComponent,ReactiveFormsModule,NgIf,OrderCompletedComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  cartItems: CourseItem[] = [];
  checkoutForm!: FormGroup;

  submitted = false;
  constructor(
    private cartService: CartService,
    private toastService: ToastService,
    private router : Router
  ) {
    this.initForm();
  }

  showCompletedMessage = false;
  get f() { return this.checkoutForm.controls; }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  initForm() {
    this.checkoutForm = new FormGroup({
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      paymentMethod: new FormControl('', [Validators.required]),
      cardName: new FormControl('', [Validators.required]),
      cardNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{16}$/)]),
      expiryDate: new FormControl('', [Validators.required]),
      cvv: new FormControl('', [Validators.required, Validators.pattern(/^\d{3,4}$/)]),
    });
  }

  get totalPrice(): string {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  }

  onSubmit() {
    this.submitted = true;
    if (this.checkoutForm.invalid) {
      this.toastService.showToast('In Valid Data','error');
      return
    };
    this.showCompletedMessage = true;
    this.cartService.clearCart();
    setTimeout(() => {
      this.showCompletedMessage = false;
      this.router.navigate(['/']);
    }, 3000);

    this.toastService.showToast('Checkout Successful!','success');

  }



}
