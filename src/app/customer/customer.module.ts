import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ValidateEqualModule } from 'ng-validate-equal';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { ToastrModule } from 'ngx-toastr';
import { DpDatePickerModule } from "ng2-date-picker";
import { NgSelectModule } from '@ng-select/ng-select';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

//components
import { CustomerRoutingModule } from './customer-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { CusContactsComponent } from './cus-contacts/cus-contacts.component';
import { CusDashboardInchangeComponent } from './cus-dashboard-inchange/cus-dashboard-inchange.component';
import { CusExchangeComponent } from './cus-exchange/cus-exchange.component';
import { CusExchangeGeneralComponent } from './cus-exchange-general/cus-exchange-general.component';
import { CusForgotPasswordComponent } from './cus-forgot-password/cus-forgot-password.component';
import { CusLoginComponent } from './cus-login/cus-login.component';
import { CusOpenExchangeComponent } from './cus-open-exchange/cus-open-exchange.component';
import { CusSignupComponent } from './cus-signup/cus-signup.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { TwoFactorComponent } from './two-factor/two-factor.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { NgxMaskModule, IConfig } from 'ngx-mask';
const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [ManageProfileComponent,DashboardComponent, SidebarComponent, HeaderComponent, CusContactsComponent, CusDashboardInchangeComponent, CusExchangeComponent, CusExchangeGeneralComponent, CusForgotPasswordComponent, CusLoginComponent, CusOpenExchangeComponent, CusSignupComponent, TwoFactorComponent],
  imports: [
    CommonModule,
    NgOtpInputModule,
    CustomerRoutingModule,
    FormsModule,
    HttpClientModule,
    ValidateEqualModule,
    NgxPaginationModule,
    OrderModule,
    DpDatePickerModule,
    NgSelectModule,
    ToastrModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    NgxMaskModule.forRoot(maskConfig)
  ]
})
export class CustomerModule { }
