import { afterNextRender, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // URLs to bypass (login and register)
        const bypassUrls = ['/auth/login', '/auth/signup', '/Competence/all'];

        // Check if the request URL matches any of the bypass URLs
        const shouldBypass = bypassUrls.some(url => req.url.includes(url));

        // If it's not a browser or the URL should be bypassed, just forward the request
        if (isPlatformBrowser(this.platformId) && !shouldBypass) {
            const idToken = localStorage.getItem('token');
            if (idToken) {
                // Clone the request and add the Authorization header
                const cloned = req.clone({
                    headers: req.headers.set('Authorization', 'Bearer ' + idToken)
                });
                return next.handle(cloned);
            }
        }

        // For login/register or when no token is present, just pass the request as is
        return next.handle(req);



    }

}