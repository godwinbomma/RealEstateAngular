//modules
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { SuperadminRoutingModule } from './superadmin-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ValidateEqualModule } from 'ng-validate-equal';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DpDatePickerModule } from "ng2-date-picker";
import { NgSelectModule } from '@ng-select/ng-select';


//components
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

// import { ManageApprovalListComponent } from './manage-approval-list/manage-approval-list.component';
// import { ManageExchangesComponent } from './manage-exchanges/manage-exchanges.component';
// import { ManageApprovalListDetailComponent } from './manage-approval-list-detail/manage-approval-list-detail.component';
// import { ManageExchangesListComponent } from './manage-exchanges-list/manage-exchanges-list.component';

// import { ManageEmployeesAddDetailComponent } from './manage-employees-add-detail/manage-employees-add-detail.component';
// import { ManageEmployeesDetailComponent } from './manage-employees-detail/manage-employees-detail.component';
// import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';

import { ManageSynergyClientsComponent } from './manage-synergy-clients/manage-synergy-clients.component';
import { CustomFieldsComponent } from './custom-fields/custom-fields.component';
import { TemplareFieldsContactComponent } from './templare-fields-contact/templare-fields-contact.component';
import { DocumentTemplateComponent } from './document-template/document-template.component';
import { ManageContactDetailComponent } from './manage-contact-detail/manage-contact-detail.component';
import { ManageContactComponent } from './manage-contact/manage-contact.component';

// import { ReportsRevenueOvertimeComponent } from './reports-revenue-overtime/reports-revenue-overtime.component';
// import { ReportsBalanceBreakdownComponent } from './reports-balance-breakdown/reports-balance-breakdown.component';
// import { ReportsBalanceBreakdownEditComponent } from './reports-balance-breakdown-edit/reports-balance-breakdown-edit.component';
// import { ReportsRevenueOvertimeEditComponent } from './reports-revenue-overtime-edit/reports-revenue-overtime-edit.component';


//new
import { CommonLayoutComponent } from './common-layout/common-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//import { ManageIntakeFormComponent } from './exchanges/manage-intake-form/manage-intake-form.component';

//module
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { ManageAgentComponent } from './manage-agent/manage-agent.component';
import { TwoFactorComponent } from './two-factor/two-factor.component';
import { NgOtpInputModule } from  'ng-otp-input';
const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({

  imports: [
    CommonModule,
    NgOtpInputModule,
    SuperadminRoutingModule,
    FormsModule,
    HttpClientModule,
    ValidateEqualModule,
    NgxPaginationModule,
    OrderModule,
    DpDatePickerModule,
    NgSelectModule,
    ReactiveFormsModule,
    MatSelectModule,
    AngularMultiSelectModule,
    NgxMatSelectSearchModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(maskConfig),
NgbModule
  ],
  exports: [
    FormsModule,
    NgxPaginationModule,
    OrderModule,

  ],
  providers: [
    ToastrService,
    DatePipe
    
  ],
  schemas: [NO_ERRORS_SCHEMA],
  declarations: [
    LoginComponent,
    HeaderComponent, 
    SidebarComponent,
    ManageProfileComponent,
    DasboardComponent, 
    ManageSynergyClientsComponent, 
    CustomFieldsComponent, 
    TemplareFieldsContactComponent, 
    DocumentTemplateComponent, 
    ManageContactDetailComponent, 
    ManageContactComponent, 
    CommonLayoutComponent, 
    ManageRoleComponent,
    ManageAgentComponent,
    TwoFactorComponent
  ]
})
export class SuperadminModule { }
