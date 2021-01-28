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


// components
import { SynergyRoutingModule } from './synergy-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { SynExchangeComponent } from './syn-exchange/syn-exchange.component';
import { SynAccountsComponent } from './syn-accounts/syn-accounts.component';
import { SynAccountsDetailComponent } from './syn-accounts-detail/syn-accounts-detail.component';
import { SynContactsComponent } from './syn-contacts/syn-contacts.component';
import { SynContactsDetailComponent } from './syn-contacts-detail/syn-contacts-detail.component';
import { SynExchangeIntakeFormComponent } from './syn-exchange-intake-form/syn-exchange-intake-form.component';
import { SynForgotPasswordComponent } from './syn-forgot-password/syn-forgot-password.component';
import { SynLoginComponent } from './syn-login/syn-login.component';
import { SynOpenExchangeComponent } from './syn-open-exchange/syn-open-exchange.component';
import { SynSignupComponent } from './syn-signup/syn-signup.component';
import { MatSelectModule } from '@angular/material/select';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { TwoFactorComponent } from './two-factor/two-factor.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { SynManageAgentComponent } from './syn-manage-agent/syn-manage-agent.component';
import { SynManageAgentExchangeComponent } from './syn-manage-agent-exchange/syn-manage-agent-exchange.component';
const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [ManageProfileComponent,DashboardComponent, SidebarComponent, HeaderComponent, SynExchangeComponent, SynAccountsComponent, SynAccountsDetailComponent, SynContactsComponent, SynContactsDetailComponent, SynExchangeIntakeFormComponent, SynForgotPasswordComponent, SynLoginComponent, SynOpenExchangeComponent, SynSignupComponent, TwoFactorComponent, SynManageAgentComponent, SynManageAgentExchangeComponent],
  imports: [
    CommonModule,
    SynergyRoutingModule,
    FormsModule,
    NgOtpInputModule,
    HttpClientModule,
    ValidateEqualModule,
    NgxPaginationModule,
    OrderModule,
    DpDatePickerModule,
    NgSelectModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatTabsModule,
    NgxMaskModule.forRoot(maskConfig)
  ]
})
export class SynergyModule { }
