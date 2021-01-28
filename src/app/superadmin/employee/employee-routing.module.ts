import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageEmployeesAddDetailComponent } from './manage-employees-add-detail/manage-employees-add-detail.component';
import { ManageEmployeesDetailComponent } from './manage-employees-detail/manage-employees-detail.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import {ManageEmployeeEditComponent} from './manage-employee-edit/manage-employee-edit.component'

const routes: Routes = [
  // { path: 'list', component: ManageEmployeeComponent },
  // { path: 'add', component: ManageEmployeesAddDetailComponent },
  // { path: 'edit', component: ManageEmployeesDetailComponent },
  { path: 'set', component: ManageEmployeesDetailComponent },
  { path: 'add', component: ManageEmployeesAddDetailComponent },
  { path: 'edit/:id', component: ManageEmployeeEditComponent },
  { path: 'list', component: ManageEmployeeComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
