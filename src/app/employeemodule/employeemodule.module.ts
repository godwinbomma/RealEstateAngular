//modules
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
import { EmployeemoduleRoutingModule } from './employeemodule-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { EmpAssignedTaskComponent } from './emp-assigned-task/emp-assigned-task.component';
import { EmpExchangeListComponent } from './emp-exchange-list/emp-exchange-list.component';
import { EmpContactComponent } from './emp-contact/emp-contact.component';
import { EmpContactsAddComponent } from './emp-contacts-add/emp-contacts-add.component';
import { EmpContactsAddDetailComponent } from './emp-contacts-add-detail/emp-contacts-add-detail.component';
import { EmpExchangeGeneralComponent } from './emp-exchange-general/emp-exchange-general.component';
import { EmpForgotPasswordComponent } from './emp-forgot-password/emp-forgot-password.component';
import { EmpLoginComponent } from './emp-login/emp-login.component';
import { EmpSignupComponent } from './emp-signup/emp-signup.component';
import { EmpTemplateFieldsComponent } from './emp-template-fields/emp-template-fields.component';
import { EmpManageApprovalComponent } from './emp-manage-approval/emp-manage-approval.component';
import { EmpApprovalListDetailComponent } from './emp-approval-list-detail/emp-approval-list-detail.component';
import { EmpCreateExchangeComponent } from './emp-create-exchange/emp-create-exchange.component';
import { EmpDocumentTemplateComponent } from './emp-document-template/emp-document-template.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';


import { from } from 'rxjs';
import { TwoFactorComponent } from './two-factor/two-factor.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { NgxMaskModule, IConfig } from 'ngx-mask';
const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [ManageProfileComponent,DashboardComponent, HeaderComponent, SidebarComponent, EmpAssignedTaskComponent, EmpExchangeListComponent, EmpContactComponent, EmpContactsAddComponent, EmpContactsAddDetailComponent, EmpExchangeGeneralComponent, EmpForgotPasswordComponent, EmpLoginComponent, EmpSignupComponent, EmpTemplateFieldsComponent, EmpManageApprovalComponent, EmpApprovalListDetailComponent,  EmpCreateExchangeComponent, EmpDocumentTemplateComponent, TwoFactorComponent],
  imports: [
    CommonModule,
    EmployeemoduleRoutingModule,
    FormsModule,
    HttpClientModule,
    ValidateEqualModule,
    NgxPaginationModule,
    OrderModule,
    DpDatePickerModule,
    NgSelectModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    AngularMultiSelectModule,
    NgOtpInputModule,
    NgxMaskModule.forRoot(maskConfig)
  ]
})
export class EmployeemoduleModule { }
