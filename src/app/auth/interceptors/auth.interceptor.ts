import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, OperatorFunction } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: AuthService) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = localStorage.getItem(environment.localStorageUserDataKey)
    ? JSON.parse(localStorage.getItem(environment.localStorageUserDataKey)!)
    : null;

    if (accessToken) {
      const clonedRequest: HttpRequest<unknown> = request.clone({
        setHeaders: { Authorization: `${ accessToken.token }` }
      });

      // Automatically logout if the server returns a 401 status code.
      // Receives the backend response and handles catches the error if applicable (401 status code).
      return next.handle(clonedRequest).pipe(this.handleError());
    }

    return next.handle(request);
  }

  /**
   * Handles the error if the server returns a 401 status code.
   *
   * @private
   */
  private handleError(): OperatorFunction<HttpEvent<any>, HttpEvent<unknown>> {
    return catchError((error: HttpErrorResponse): Observable<HttpEvent<unknown>> => {
      if (error.status === 401) { this.loginService.logout(); }

      throw error;
    });
  }
}
