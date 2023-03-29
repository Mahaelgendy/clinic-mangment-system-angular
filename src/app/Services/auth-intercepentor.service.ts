import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthIntercepentorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // Get the JWT token from local storage
    const token = sessionStorage.getItem('token');
    // If the JWT token is present, add it to the authorization header
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}

