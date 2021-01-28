import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidateEqualModule } from 'ng-validate-equal';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { DpDatePickerModule } from "ng2-date-picker";
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


import { ExchangesRoutingModule } from './exchanges-routing.module';
import { ManageIntakeFormComponent } from './manage-intake-form/manage-intake-form.component';

import { ManageApprovalListComponent } from './manage-approval-list/manage-approval-list.component';
import { ManageExchangesComponent } from './manage-exchanges/manage-exchanges.component';
import { ManageApprovalListDetailComponent } from './manage-approval-list-detail/manage-approval-list-detail.component';
import { ManageExchangesListComponent } from './manage-exchanges-list/manage-exchanges-list.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomFilterPipe } from '../../pipe/custom-filter.pipe';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxMaskModule, IConfig } from 'ngx-mask';
const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [
    ManageIntakeFormComponent,
    ManageApprovalListComponent,
    ManageExchangesComponent,
    ManageApprovalListDetailComponent,
    ManageExchangesListComponent,
 
    CustomFilterPipe,
  ],
  providers: [
    ToastrService
    
  ],
  imports: [
    CommonModule,
    ExchangesRoutingModule,
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
    AngularMultiSelectModule,
    NgxMaskModule.forRoot(maskConfig)
  ]
})
export class ExchangesModule { }
