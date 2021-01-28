import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormArray, FormControl } from '@angular/forms';
import { EmployeeService } from 'src/app/service/employee.service';
import { ToastrService } from 'ngx-toastr';
declare let $ :any;


@Component({
  selector: 'app-manage-employees-add-detail',
  templateUrl: './manage-employees-add-detail.component.html',
  styleUrls: ['./manage-employees-add-detail.component.css']
})
export class ManageEmployeesAddDetailComponent implements OnInit {

  AddEmployeeForm: FormGroup;
  public PrevilegesList: any = [];
  userDetails : any =[];
  name = 'Angular';
  number:any={
    phoneNumber:'' }

  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private employeeservice: EmployeeService,
    private activated_route: ActivatedRoute,
    private toastr: ToastrService
  ) {

      this.AddEmployeeForm = this.formBuilder.group({
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      MobileNumber: new FormControl(''),
      EmailAddress: new FormControl('', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
      createdBy: new FormControl(1),
      twofactorConfig : new FormControl(0, Validators.required),
      previleges: this.formBuilder.array([]),
    });
   
  }

   
  ngOnInit(): void {
    debugger;
    this.userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
    this.getPrevileges();
  }


  getPrevileges(): any {
    var self = this;
    self.employeeservice._get_previlegeslist().subscribe((data: any) => {
      debugger;
      console.log(data);
      const control = <FormArray>self.AddEmployeeForm.get('previleges');
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
            createdBy: new FormControl(this.userDetails['userId'])
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
            createdBy: this.userDetails['userId'],
          };
          self.PrevilegesList.push(obj);
        })
      }

      console.log("control ", control.value);
      console.log("self.PrevilegesList ", self.PrevilegesList);
    })
  }


  getControls(){
    debugger;
    return (this.AddEmployeeForm.get('previleges') as FormArray).controls;
  }

  checkedIstrue(index: number){
    debugger;
    var data = this.AddEmployeeForm.get('previleges')!.value;
    return data[index].checkbox;
  }

  previlegeIsChecked(e: any) {
    debugger;
    console.log("event ", e.target.checked);
    console.log("value ", e.target.value);
    if (!e.target.checked) {
      (<FormArray>this.AddEmployeeForm.get('previleges')).controls.map((item: any) => {
        item.patchValue({
          isView: false,
          isCreate: false,
          isEdit: false,
          isDelete: false,
        });
      });
    }
  }
  
  AddEmployee() {
    debugger;
    if (this.AddEmployeeForm.invalid) {
      this.AddEmployeeForm.markAllAsTouched();
    }
    else {
      debugger;
        console.log("this.previlegesList ", this.AddEmployeeForm.value);
     
        var formData = this.AddEmployeeForm.value;
       
          this.employeeservice._add_employee(formData).subscribe((data:any)=> {
            debugger
            if(data.result == true)
            {
              debugger;
              console.log(data);
              this.toastr.success('The employee is created successfully');
              this.AddEmployeeForm.reset();
              this.route.navigate(['employee/list']);

            }
            else
            {
              this.toastr.error('Employee Email/PhoneNumber already exist', 'Failed!');
            }
          },(error:any) => {
  
          })
        }
      
       
  }
}


