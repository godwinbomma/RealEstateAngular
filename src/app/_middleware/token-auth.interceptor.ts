import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenService} from '../service/token.service'
import { NgxSpinnerService } from "ngx-spinner";
import { catchError, delay, finalize, tap } from 'rxjs/operators';
@Injectable()
export class TokenAuthInterceptor implements HttpInterceptor {

  constructor(private token: TokenService,private spinner: NgxSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    const token = this.token._get_token();
    console.log("im interceptor", token)
    if(token != null){
      request = request.clone({headers : request.headers.set('Authorization','Bearer '+token)})
    }
    
    return next.handle(request).pipe(
      delay(2000),
      finalize(() =>  this.spinner.hide()),
      
     
);

  }
}
