//modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// components
import { LoginComponent } from './login/login.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { DasboardComponent } from './dasboard/dasboard.component';


// import { ManageApprovalListComponent } from './manage-approval-list/manage-approval-list.component';
// import { ManageExchangesComponent } from './manage-exchanges/manage-exchanges.component';
// import { ManageApprovalListDetailComponent } from './manage-approval-list-detail/manage-approval-list-detail.component';
// import { ManageExchangesListComponent } from './manage-exchanges-list/manage-exchanges-list.component';

// import { ManageEmployeesDetailComponent } from './manage-employees-detail/manage-employees-detail.component';
// import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
// import { ManageEmployeesAddDetailComponent } from './manage-employees-add-detail/manage-employees-add-detail.component';

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

//New
import { CommonLayoutComponent } from './common-layout/common-layout.component'
import { ManageIntakeFormComponent } from './exchanges/manage-intake-form/manage-intake-form.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { ManageAgentComponent } from './manage-agent/manage-agent.component';
import { TwoFactorComponent } from './two-factor/two-factor.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'manage-profile', component: ManageProfileComponent },
  { path: 'dashboard', component: DasboardComponent },

   { path: 'manage-intake-form', component:ManageIntakeFormComponent},
  // { path: 'manage-approval-list', component:ManageApprovalListComponent},
  // { path: 'manage-exchanges', component:ManageExchangesComponent},
  // { path: 'manage-approval-list-detail', component:ManageApprovalListDetailComponent},
  // { path: 'manage-exchanges-list', component:ManageExchangesListComponent},

  // { path: 'manage-employees-detail', component:ManageEmployeesDetailComponent},
  // { path: 'manage-employee',component:ManageEmployeeComponent},
  // { path: 'manage-employees-add-detail', component:ManageEmployeesAddDetailComponent},
  
  { path: 'manage-synergy-clients', component:ManageSynergyClientsComponent},
  { path: 'custom-fields', component:CustomFieldsComponent},
  { path: 'template-fields-contact', component:TemplareFieldsContactComponent},
  { path: 'document-template', component:DocumentTemplateComponent},
  { path: 'manage-contact-detail', component:ManageContactDetailComponent},
  { path: 'manage-contact', component:ManageContactComponent},
  { path: 'manage-role', component:ManageRoleComponent},
  { path: 'add-contact', component: ManageContactDetailComponent },
  { path: 'Edit-contact/:id', component: ManageContactDetailComponent },
  { path: 'manage-agent', component: ManageAgentComponent },
  { path: 'two-factor', component: TwoFactorComponent },
  
  // { path: 'reports-revenue-overtime', component:ReportsRevenueOvertimeComponent},
  // { path: 'reports-balance-breakdown', component:ReportsBalanceBreakdownComponent},
  // { path: 'reports-balance-breakdown-edit', component:ReportsBalanceBreakdownEditComponent},
  // { path: 'reports-revenue-overtime-edit', component:ReportsRevenueOvertimeEditComponent},

//New
  
  {
    path: '',
    component: CommonLayoutComponent,
    children: [
      { path: 'exchange',  loadChildren: () => import('./exchanges/exchanges.module').then(m => m.ExchangesModule) },
    ]
  },
  {
    path: '',
    component: CommonLayoutComponent,
    children: [
      { path: 'employee',  loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },
    ]
  },
  {
    path: '',
    component: CommonLayoutComponent,
    children: [
      { path: 'banks',  loadChildren: () => import('./banks/banks.module').then(m => m.BanksModule) },
    ]
  },
  {
    path: '',
    component: CommonLayoutComponent,
    children: [
      { path: 'reports',  loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminRoutingModule { }
