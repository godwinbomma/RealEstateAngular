import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidateEqualModule } from 'ng-validate-equal';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { ToastrModule } from 'ngx-toastr';
import { DpDatePickerModule } from "ng2-date-picker";
import { NgSelectModule } from '@ng-select/ng-select';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BanksRoutingModule } from './banks-routing.module';
import { ManageBankComponent } from './manage-bank/manage-bank.component';
import { ManageBankAddComponent } from './manage-bank-add/manage-bank-add.component';


@NgModule({
  declarations: [ManageBankComponent, ManageBankAddComponent],
  imports: [
    CommonModule,
    BanksRoutingModule,
    ValidateEqualModule,
    NgxPaginationModule,
    OrderModule,
    DpDatePickerModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    ToastrModule.forRoot(),
  ]
})
export class BanksModule { }
