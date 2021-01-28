import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageIntakeFormComponent } from './manage-intake-form/manage-intake-form.component';
import { ManageApprovalListComponent } from './manage-approval-list/manage-approval-list.component';
import { ManageExchangesComponent } from './manage-exchanges/manage-exchanges.component';
import { ManageApprovalListDetailComponent } from './manage-approval-list-detail/manage-approval-list-detail.component';
import { ManageExchangesListComponent } from './manage-exchanges-list/manage-exchanges-list.component';


const routes: Routes = [
  { path: 'create', component: ManageIntakeFormComponent },
  { path: 'approval/list', component: ManageApprovalListComponent },
  { path: 'approvaldetail/:id/:id2', component: ManageApprovalListDetailComponent },
  { path: 'list', component: ManageExchangesListComponent },
  { path: 'view/:id/:id2', component: ManageExchangesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangesRoutingModule { }
