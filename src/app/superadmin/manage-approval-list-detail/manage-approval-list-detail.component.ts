import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExchangeService } from '../../service/exchange.service';


@Component({
  selector: 'app-manage-approval-list-detail',
  templateUrl: './manage-approval-list-detail.component.html',
  styleUrls: ['./manage-approval-list-detail.component.css']
})
export class ManageApprovalListDetailComponent implements OnInit {

  fileName: any;
  file: any;
  AssignEmployeeForm: FormGroup;
  AssignExchangeDropdownList: any = {};

  constructor(
    private exchangeservice: ExchangeService,
    private route: Router,
    private formBuilder: FormBuilder,

  )
  {
    this.AssignEmployeeForm = this.formBuilder.group({
      EmployeeId: new FormControl('', Validators.required),
      TaskId: new FormControl('', Validators.required),
      Issynergy: new FormControl('', Validators.required),
      SynergyId: new FormControl('', Validators.required),
      IsEscrowdocumentsattached: new FormControl(false),
      Isrequestednotyetreceived: new FormControl(false),
      IsrequestEscrowdocuments: new FormControl(false),
      Notes: new FormControl('', Validators.required),
      File: new FormControl(),
      
    });
  }

  ngOnInit(): void {
    
    this.getdropdownList();

  }

  onChange(file: any) {
    debugger;
    this.file = file.files[0];
    this.fileName = file.files[0].name;
  }

  removeFile() {
    this.file = null;
    this.fileName = '';
  }

  assignemployee() {
    debugger;
    if (this.AssignEmployeeForm.invalid) {
      this.AssignEmployeeForm.markAllAsTouched();
    } else {
      let jsonObj = {
        "ExchangeId": 1,
        "EmployeeId": this.AssignEmployeeForm.controls.EmployeeId.value,
        "TaskId": this.AssignEmployeeForm.controls.TaskId.value,
        "PropertyId": this.AssignEmployeeForm.controls.Issynergy.value,
        "SynergyClientId": this.AssignEmployeeForm.controls.SynergyId.value,
        "IsSynergyClient": this.AssignEmployeeForm.controls.Issynergy.value,
        "EscrowDocumentsAreAttached": this.AssignEmployeeForm.controls.Isrequestednotyetreceived.value,
        "EscrowDocumentsRequestedNotYetReceived": this.AssignEmployeeForm.controls.IsrequestEscrowdocuments.value,
        "PleaseRequestEscrowDocuments": this.AssignEmployeeForm.controls.IsrequestEscrowdocuments.value,
        "Notes": this.AssignEmployeeForm.controls.Notes.value,
        "Documents": this.file

        //userDetails['userId'],
      }
      this.exchangeservice._AssignEmployee(jsonObj).subscribe((success:any) => {
        console.log(success);
        this.route.navigate(['superadmin/manage-contact']);
        // this.toast.success(success['response']);
      }, 
        // this.toast.error(error['error']);
      )}
  }
  getdropdownList() {
    debugger;
    this.exchangeservice._AssignExchangeListDropdown().subscribe((data: any) => {
    console.log(data)
      debugger;
      this.AssignExchangeDropdownList = data['userData'];
    })

  }
}
