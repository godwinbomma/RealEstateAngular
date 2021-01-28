import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// components
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { TwoFactorComponent } from './two-factor/two-factor.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
   { path: 'dashboard', component: DashboardComponent },
   { path: 'emp-assigned-task', component: EmpAssignedTaskComponent },
   { path: 'emp-exchange-list', component: EmpExchangeListComponent },
   { path: 'emp-contact', component: EmpContactComponent },
   { path: 'emp-addcontact', component: EmpContactsAddComponent },
   { path: 'emp-editcontact/:id', component: EmpContactsAddComponent },
   { path: 'emp-viewcontact/:id', component: EmpContactsAddDetailComponent },
   { path: 'emp-exchange-general/:id/:id2', component: EmpExchangeGeneralComponent },
   { path: 'emp-forgot-password', component: EmpForgotPasswordComponent },
   { path: 'employee/login', component: EmpLoginComponent },
   { path: 'emp-signup', component: EmpSignupComponent },
   { path: 'emp-template-fields', component: EmpTemplateFieldsComponent },
   { path: 'emp-manage-approval/:id/:id2', component: EmpManageApprovalComponent },
   { path: 'emp-approval-list-detail', component: EmpApprovalListDetailComponent },
   { path: 'emp-create-exchange', component: EmpCreateExchangeComponent },
   { path: 'emp-document-template', component: EmpDocumentTemplateComponent },
   { path: 'manage-profile', component: ManageProfileComponent },
   { path: 'two-factor', component: TwoFactorComponent },
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeemoduleRoutingModule { }
