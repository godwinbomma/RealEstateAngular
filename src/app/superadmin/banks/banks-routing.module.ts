import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageBankComponent } from './manage-bank/manage-bank.component';
import { ManageBankAddComponent } from './manage-bank-add/manage-bank-add.component';

const routes: Routes = [
  { path: 'list', component: ManageBankComponent },
  { path: 'add', component: ManageBankAddComponent },
  { path: 'Edit-Bank/:id', component: ManageBankAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BanksRoutingModule { }
