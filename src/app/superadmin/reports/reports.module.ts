import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidateEqualModule } from 'ng-validate-equal';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { DpDatePickerModule } from "ng2-date-picker";
import { NgSelectModule } from '@ng-select/ng-select';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsRevenueOvertimeComponent } from './reports-revenue-overtime/reports-revenue-overtime.component';
import { ReportsBalanceBreakdownComponent } from './reports-balance-breakdown/reports-balance-breakdown.component';
import { ReportsBalanceBreakdownEditComponent } from './reports-balance-breakdown-edit/reports-balance-breakdown-edit.component';
import { ReportsRevenueOvertimeEditComponent } from './reports-revenue-overtime-edit/reports-revenue-overtime-edit.component';



@NgModule({
  declarations: [
    ReportsRevenueOvertimeComponent,
    ReportsBalanceBreakdownComponent,
    ReportsBalanceBreakdownEditComponent,
    ReportsRevenueOvertimeEditComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ValidateEqualModule,
    NgxPaginationModule,
    OrderModule,
    DpDatePickerModule,
    NgSelectModule
  ]
})
export class ReportsModule { }
