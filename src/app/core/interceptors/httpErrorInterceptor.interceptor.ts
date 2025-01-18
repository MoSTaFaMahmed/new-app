import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpStatus } from '@core/enums/httpErors';
import { ToastService } from '@core/services/utilites/toast.service';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private toastService: ToastService
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred';

        console.log(errorMessage);
        switch (error.status) {
          case HttpStatus.NetworkError:
            errorMessage = 'Network error. Please check your internet connection.';
            break;
          case HttpStatus.BadRequest:
            errorMessage = 'Bad Request. Please check your input.';
            break;
          case HttpStatus.NotFound:
            errorMessage = 'The requested resource was not found.';
            break;
          case HttpStatus.ServerError:
            errorMessage = 'Server error. Please try again later.';
            break;
          case HttpStatus.Unauthorized:
            errorMessage = 'Unauthorized access. Redirecting to login.';
            this.router.navigate(['/']);
            break;
          default:
            errorMessage = `Error: ${error.message}`;
            break;
        }
        console.log(errorMessage);

        this.toastService.showToast(errorMessage, 'error');


        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
