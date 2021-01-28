
// modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


// components
import { AppComponent } from './app.component';
//interceptor
import { TokenAuthInterceptor } from './_middleware/token-auth.interceptor';
import { HttpErrorInterceptor } from './_middleware/http-error.interceptor';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import {Ng2TelInputModule} from 'ng2-tel-input';
import {ServiceService} from "./service/service.service";
import { HttpClientModule } from "@angular/common/http";

import { DialogComponent } from './dialog/dialog.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent
 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxPaginationModule,
    OrderModule,
    FormsModule ,
    NgxSpinnerModule,
    Ng2TelInputModule,
    HttpClientModule,
  //  NgbModule
  ],
  exports:  [
//    NgbModule 
  ],
  entryComponents: [
    
  ],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenAuthInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    ServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
