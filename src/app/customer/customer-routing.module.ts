import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//components
import { DashboardComponent } from './dashboard/dashboard.component';
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

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
   { path: 'cus-contacts', component: CusContactsComponent },
   { path: 'cus-dashboard-inchange', component: CusDashboardInchangeComponent },
   { path: 'cus-exchange', component: CusExchangeComponent },
   { path: 'cus-exchange-general/:id/:id2/:id3', component: CusExchangeGeneralComponent },
   { path: 'cus-forgot-password', component: CusForgotPasswordComponent },
   { path: 'customer/login', component: CusLoginComponent },
   { path: 'cus-open-exchange', component: CusOpenExchangeComponent },
   { path: 'cus-signup', component: CusSignupComponent },
   { path: 'dashboard', component: DashboardComponent },
   { path: 'manage-profile', component: ManageProfileComponent },
   { path: 'two-factor', component: TwoFactorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
