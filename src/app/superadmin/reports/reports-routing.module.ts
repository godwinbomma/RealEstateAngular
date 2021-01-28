import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsRevenueOvertimeComponent } from './reports-revenue-overtime/reports-revenue-overtime.component';
import { ReportsBalanceBreakdownComponent } from './reports-balance-breakdown/reports-balance-breakdown.component';
import { ReportsBalanceBreakdownEditComponent } from './reports-balance-breakdown-edit/reports-balance-breakdown-edit.component';
import { ReportsRevenueOvertimeEditComponent } from './reports-revenue-overtime-edit/reports-revenue-overtime-edit.component';


const routes: Routes = [
  { path: 'balance/overtime', component: ReportsRevenueOvertimeComponent },
  { path: 'balance/breakdown', component: ReportsBalanceBreakdownComponent },
  { path: 'revenue/overtime', component: ReportsRevenueOvertimeEditComponent },
  { path: 'revenue/breakdown', component: ReportsBalanceBreakdownEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
