import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';
import { ToastrService } from 'ngx-toastr';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-manage-employee-edit',
  templateUrl: './manage-employee-edit.component.html',
  styleUrls: ['./manage-employee-edit.component.css']
})
export class ManageEmployeeEditComponent implements OnInit {
  userDetails : any =[];
  EmployeeId: number;
  public PrevilegesList: any = [];
  public EmployeePrevileges: any = [];
  UpdateEmployeeForm: FormGroup;
  Employeedetails: any = {};
  Userdata: any = {};
  @ViewChild('passwordToggle') passwordToggle: ElementRef;
  constructor(
    private employeeService: EmployeeService,
    private activated_route: ActivatedRoute,
    private route: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {

    this.UpdateEmployeeForm = this.formBuilder.group({
      
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      MobileNumber: new FormControl('', Validators.required),
      EmailAddress: new FormControl('', Validators.required),
      employeeId: new FormControl(this.EmployeeId),
      Password:new FormControl('')
    
      
    });

  }

  ngOnInit(): void {
    debugger;
    this.userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
    //this.getPrevileges(); 
    debugger;
    this.activated_route.params.subscribe(params => {
      this.EmployeeId = Number(params['id']);
    });
    let employeeid = Number.isNaN(this.EmployeeId);
    if (employeeid != true) {
      //this.updateNegotiator = true;
      this.getPrevilegesbyId(this.EmployeeId);
    }
  }
  getPrevilegesbyId(employeeId: number) {
    var self = this;
    self.employeeService.__getPrevileges_byId(employeeId).subscribe((data: any) => {
      debugger;
      this.Userdata.first = data['responseData'].firstName;
      this.Userdata.last = data['responseData'].lastName;
      this.Userdata.mobile = data['responseData'].mobileNumber;
      this.Userdata.email = data['responseData'].emailAddress;
      this.Userdata.Password=data['responseData'].password;
      console.log(data)
      const control = <FormArray>self.UpdateEmployeeForm.get('previleges');
      console.log("control ", control.value.length);
      // self.previlegesList = data.response;
      if (control.value.length == 0) {
        data.responseData.previlegesLists.map((item: any) => {
          if (item.isView == true || item.isCreate == true || item.isEdit || item.isDelete) {
            item.checkbox = true;
          }
          else {
            item.checkbox = false;
          }
          control.push(new FormGroup({
            employeeId: new FormControl(this.EmployeeId),
            previlesId: new FormControl(item.previlesId),
            moduleName: new FormControl(item.moduleName),
            privilegeName: new FormControl(item.privilegeName),
            checkbox: new FormControl(item.checkbox),
            isView: new FormControl(item.isView),
            isCreate: new FormControl(item.isCreate),
            isEdit: new FormControl(item.isEdit),
            isDelete: new FormControl(item.isDelete),
            createdBy: new FormControl(this.userDetails['userId'])
          }))
          var obj = {
            employeeId: +this.EmployeeId,
            previlesId: item.previlesId,
            moduleName: item.moduleName,
            privilegeName: item.privilegeName,
            checkbox: item.checkbox,
            isView: item.isView,
            isCreate: item.isCreate,
            isEdit: item.isEdit,
            isDelete: item.isDelete,
            createdBy: this.userDetails['userId'],
           
          };
          self.PrevilegesList.push(obj);
        })
      }
      console.log("control ", control.value);
      console.log("self.PrevilegesList ", self.PrevilegesList);
    })
  }
      



  checkedIstrue(index: number) {
    debugger;
    var data = this.UpdateEmployeeForm.get('previleges')!.value;
    return data[index].checkbox;
  }

  previlegeIsChecked(e: any) {
    debugger;
    console.log("event ", e.target.checked);
    console.log("value ", e.target.value);
    if (!e.target.checked) {
      (<FormArray>this.UpdateEmployeeForm.get('previleges')).controls.map((item: any) => {
        item.patchValue({
          isView: false,
          isCreate: false,
          isEdit: false,
          isDelete: false,
        });
      });
    }
  }


  

  UpdateEmployee() {
    debugger;
    if (this.UpdateEmployeeForm.invalid) {
      this.UpdateEmployeeForm.markAllAsTouched();

    }
    else {
      debugger;
      console.log("this.previlegesList ", this.UpdateEmployeeForm.value);

      this.UpdateEmployeeForm.controls['employeeId'].setValue(this.EmployeeId);
      var formData = this.UpdateEmployeeForm.value;
      console.log("formData ", formData);     
      this.employeeService._update_employee(formData).subscribe((data:any) => {
        console.log(data);
        debugger;
       if(data.iSsuccessResponse == true)
       {
        this.toastr.success('Employee updated successfully', 'Success!');
        this.route.navigate(['employee/list']);
        }
        else
       {
            this.toastr.error('Employee Email/PhoneNumber already exist', 'Failed!');
       }
      }, (error:any) => {

      })
    }
  }
  toggleClick() {
    //$('.login-input-bx').attr('type', 'text');
    let type = this.passwordToggle.nativeElement.type;
    this.passwordToggle.nativeElement.type = (type == "password") ? "text" : "password";
  }

}
