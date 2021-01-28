import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { ValidateEqualModule } from 'ng-validate-equal';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { ToastrModule } from 'ngx-toastr';
import { DpDatePickerModule } from "ng2-date-picker";
import { NgSelectModule } from '@ng-select/ng-select';


import { EmployeeRoutingModule } from './employee-routing.module';
import { ManageEmployeesAddDetailComponent } from './manage-employees-add-detail/manage-employees-add-detail.component';
import { ManageEmployeesDetailComponent } from './manage-employees-detail/manage-employees-detail.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { ManageEmployeeEditComponent } from './manage-employee-edit/manage-employee-edit.component';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { NgxMaskModule, IConfig } from 'ngx-mask';
const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    ManageEmployeesAddDetailComponent,
    ManageEmployeesDetailComponent,
    ManageEmployeeComponent,
    ManageEmployeeEditComponent,
  ],
  providers: [
    ToastrService
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ValidateEqualModule,
    NgxPaginationModule,
    OrderModule,
    DpDatePickerModule,
    NgSelectModule,
    Ng2TelInputModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(maskConfig)
  ],
  // exports: [
  //   FormsModule,
  //   NgxPaginationModule,
  //   OrderModule

  // ],
})
export class EmployeeModule { }
