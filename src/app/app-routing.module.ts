//modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperadminModule } from './superadmin/superadmin.module'
import { EmployeemoduleModule } from './employeemodule/employeemodule.module';
import { SynergyModule } from './synergy/synergy.module';
import { CustomerModule } from './customer/customer.module';

// components
const routes: Routes = [
  { path: '', redirectTo: '/superadmin/dashboard', pathMatch: 'full' },
  { path: 'superadmin', loadChildren: './superadmin/superadmin.module#SuperadminModule' },
  { path: 'employee', loadChildren: './employeemodule/employeemodule.module#EmployeemoduleModule' },
  { path: 'synergy', loadChildren: './synergy/synergy.module#SynergyModule' },
  { path: 'customer', loadChildren: './customer/customer.module#CustomerModule' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, SuperadminModule, EmployeemoduleModule, SynergyModule, CustomerModule]
})
export class AppRoutingModule { }
