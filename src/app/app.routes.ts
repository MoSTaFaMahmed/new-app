import { Routes } from '@angular/router';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { HomePageComponent } from './features/home/home-page/home-page.component';
import { CourseDetailsComponent } from './features/course-details/course-details.component';
import { CartGuard } from '@core/guards/cart.guard';
import { CartComponent } from './features/cart/cart.component';
import { CheckoutComponent } from './features/checkout/checkout.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'course-details/:id',
    component: CourseDetailsComponent,
  },
  {
   path : 'cart',
   component : CartComponent,
   canActivate: [CartGuard]
  },
  {
    path : 'checkout',
    component : CheckoutComponent,
    canActivate: [CartGuard]
   },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
