import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          switch (error.status) {
            case 400:
              // localStorage.removeItem('eidhatuser');
              // localStorage.removeItem('category');
              // location.reload();
              break;
            case 401:
              // localStorage.removeItem('eidhatuser');
              // localStorage.removeItem('category');
              // location.reload();
              break;
            case 404:
              // this.router.navigateByUrl('/not-found');
              // localStorage.removeItem('category');
              // location.reload();
              break;
            case 500:
              // localStorage.removeItem('eidhatuser');
              // localStorage.removeItem('category');
              // const navigationExtras: NavigationExtras = {state: {error: error.error}}
              // this.router.navigateByUrl('/server-error', navigationExtras);
              // location.reload();
              break;
            default:
              // localStorage.removeItem('eidhatuser');
              // localStorage.removeItem('category');
              // location.reload();
              break;
          }
        }
        return throwError(error);
      })
    )
  }
}