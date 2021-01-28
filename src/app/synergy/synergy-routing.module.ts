import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// compnents
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { TwoFactorComponent } from './two-factor/two-factor.component';
import { SynManageAgentComponent } from './syn-manage-agent/syn-manage-agent.component';
import { SynManageAgentExchangeComponent } from './syn-manage-agent-exchange/syn-manage-agent-exchange.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
   { path: 'dashboard', component: DashboardComponent },
   { path: 'syn-exchange/:id/:id2/:id3/:id4', component: SynExchangeComponent },
   { path: 'syn-accounts', component: SynAccountsComponent },
   { path: 'syn-accounts-detail/:id', component: SynAccountsDetailComponent },
   { path: 'syn-contacts', component: SynContactsComponent },
   { path: 'Edit-contact/:id', component: SynContactsDetailComponent },
   { path: 'syn-contacts-detail', component: SynContactsDetailComponent },
   { path: 'syn-exchange-intake-form', component: SynExchangeIntakeFormComponent },
   { path: 'syn-forgot-password', component: SynForgotPasswordComponent },
   { path: 'synergy/login', component: SynLoginComponent },
   { path: 'syn-open-exchange', component: SynOpenExchangeComponent },
   { path: 'syn-signup', component: SynSignupComponent },
   { path: 'manage-profile', component: ManageProfileComponent },
   { path: 'two-factor', component: TwoFactorComponent },
   { path: 'syn-manage-agent', component: SynManageAgentComponent },
   { path: 'syn-manage-agent-exchange/:id', component: SynManageAgentExchangeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SynergyRoutingModule { }
