import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Routes, Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-employees-detail',
  templateUrl: './manage-employees-detail.component.html',
  styleUrls: ['./manage-employees-detail.component.css']
})
export class ManageEmployeesDetailComponent implements OnInit {


  form: FormGroup;
  multiboolean: boolean = true;
  previlegesList: any = [];
  employeeListDropdown: any = [];
 
  constructor(private formBuilder: FormBuilder, 
    private employeeservice: EmployeeService,
    private route: Router,
    private toastr: ToastrService
    ) {
    this.form = this.formBuilder.group({
      previleges: this.formBuilder.array([]),
      userIds: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.getPrevileges();
    this.getEmployeeDropdown();
  }

  getPrevileges(): any {
    debugger;
    var self = this;
    self.employeeservice._get_previlegeslist().subscribe((data: any) => {
      console.log(data);
      const control = <FormArray>self.form.get('previleges');
      console.log("control ", control.value.length);
      // self.previlegesList = data.response;
      if (control.value.length == 0) {
        data.response.map((item: any) => {
          control.push(new FormGroup({
            previlesId: new FormControl(item.previlesId),
            moduleName: new FormControl(item.moduleName),
            privilegeName: new FormControl(item.privilegeName),
            checkbox: new FormControl(false),
            isView: new FormControl(false),
            isCreate: new FormControl(false),
            isEdit: new FormControl(false),
            isDelete: new FormControl(false),
            createdBy: new FormControl(1)
          }))
          var obj = {
            previlesId: item.previlesId,
            moduleName: item.moduleName,
            privilegeName: item.privilegeName,
            checkbox: false,
            isView: false,
            isCreate: false,
            isEdit: false,
            isDelete: false,
            createdBy: 1
          };
          self.previlegesList.push(obj);
        })
      }

      console.log("control ", control.value);
      console.log("self.previlegesList ", self.previlegesList);
    })
  }

  getControls() {
    debugger;
    return (this.form.get('previleges') as FormArray).controls;
  }

  checkedIstrue(index: number) {
   
    var data = this.form.get('previleges')!.value;
    return data[index].checkbox;
  }

  previlegeIsChecked(e: any) {
    debugger;
    console.log("event ", e.target.checked);
    console.log("value ", e.target.value);
    if (!e.target.checked) {
      (<FormArray>this.form.get('previleges')).controls.map((item: any) => {
        item.patchValue({
          isView: false,
          isCreate: false,
          isEdit: false,
          isDelete: false,
        });
      });
    }
  }

  getEmployeeDropdown() {
    this.employeeservice._get_employeeListDropdown().subscribe((data: any) => {
      this.employeeListDropdown = data.response;
      console.log("this.employeeListDropdown ", this.employeeListDropdown);
    })
  }

  setPrivilegeToEmployee() {
    debugger;
    console.log("this.previlegesList ", this.form.value);
    var formData = this.form.value;
    var userPrevilegs: any = [];
    formData.userIds.forEach((id: number) => {
      formData.previleges.forEach((element: any) => {
        var obj: any = {};
        obj['userId'] = id;
        obj['previlesId'] = element.previlesId;
        obj['moduleName'] = element.moduleName;
        obj['isView'] = element.isView;
        obj['isCreate'] = element.isCreate;
        obj['isEdit'] = element.isEdit;
        obj['isDelete'] = element.isDelete;
        obj['createdBy'] = element.createdBy;
        userPrevilegs.push(obj);
      });
    });
    console.log("userPrevilegs ", userPrevilegs);
    this.employeeservice._add_employeePrevileges(userPrevilegs).subscribe((response: any) => {
      console.log("response ", response);
      if (response.isreponseSuccess == true) {
        this.toastr.success('Updated successfully');
        this.route.navigate(['/employee/employee']);
      }
    })
  }
}
