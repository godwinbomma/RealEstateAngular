import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        retry(1),
        
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
          }, 2000);
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          //alert(errorMessage);
          return throwError(errorMessage);
        })
      )
  }
}
