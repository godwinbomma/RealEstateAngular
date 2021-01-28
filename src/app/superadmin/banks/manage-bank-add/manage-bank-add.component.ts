import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-manage-bank-add',
  templateUrl: './manage-bank-add.component.html',
  styleUrls: ['./manage-bank-add.component.css']
})
export class ManageBankAddComponent implements OnInit {


  datePickerConfig = { format: 'MM/DD/YYYY' };

public leadData: any = [];
Bank: any = {};
order: string = 'leadowner';
p: number = 0;
reverse: boolean = false;
masterSelected: boolean;
checkedList: any;
Contacts: any = {};
ContactsCF: any = {};
bankid: number;
public date:any;
label : string;
state:string='Add';
constructor( private formBuilder: FormBuilder,
  private route: Router,
  private datePipe: DatePipe,
  private toastr: ToastrService,
  private authService: AuthServiceService,
  private contactservice: ContactService,
  private activated_route: ActivatedRoute) {
  for (let i = 1; i <= 100; i++) {
    this.leadData.push(`item ${i}`);
  }
  this.masterSelected = false;

  this.getCheckedItemList();
}
ngOnInit(): void {
  this.label ='ADD';
  this.activated_route.params.subscribe(params => {
    this.bankid = Number(params['id']);
    this.state='Edit';
  });
  this.label ='ADD';
  let bankid = Number.isNaN(this.bankid);
  if (bankid != true) {
    this.label ='UPDATE';
    //this.updateNegotiator = true;
     this._getBank_byId();
    }
  
  
}
addBank() {
  debugger;
  if(this.label=='ADD')
  {
    let userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
   
    let jsonObj = {
      
      "bankName":this.Bank.bankName,
  "interestRate": this.Bank.interestRate,
  "effectFrom": new Date(this.Bank.effectFrom),
  "note": this.Bank.note,
  "createdBy": userDetails['userId'],
  "createdOn": new Date()
       
      
    }
    this.contactservice.postApiCall("/api/V1/Bank/AddBank", jsonObj).subscribe((data:any) => {
      debugger;
      if(data.iSsuccessResponse==true)
      {
        this.toastr.success('Bank created successfully');
        this.route.navigate(['superadmin/banks/list']);
      }
      else{
          this.toastr.error(data.error);
          
          
       
      }
     
    }, (error:any) => {

    })
  }
  else{

  
    let userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
   
      let jsonObj = {
        "bankId": this.bankid,
           
      "bankName":this.Bank.bankName,
      "interestRate": this.Bank.interestRate,
      "effectFrom": new Date(this.Bank.effectFrom),
      "note": this.Bank.note,
      "updatedBy": userDetails['userId'],
      "updatedOn": new Date()
      }
      this.contactservice.postApiCall("/api/V1/Bank/UpdateBank", jsonObj).subscribe((data:any) => {
        debugger;
        if(data.iSsuccessResponse ==true)
        {
          this.toastr.success('Bank Updated successfully');
          this.route.navigate(['superadmin/banks/list']);
        }
        else{
            this.toastr.error(data.error);
            
            
         
        }
       
      }, (error:any) => {

      })
   
  }
    
}
setOrder(value: string) {
  if (this.order === value) {
    this.reverse = !this.reverse;
  }

  this.order = value;
}
_getBank_byId() {
  this.contactservice.__getBank_byId(this.bankid).subscribe((data: any) => {
    console.log(data)
    debugger;
    this.date=new Date();
    let latest_date = this.datePipe.transform(data['userData']['effectFrom'],'MM/dd/yyyy');
    this.Bank = data['userData'];
    this.Bank.effectFrom=latest_date;

  })
}
checkUncheckAll() {
  for (var i = 0; i < this.leadData.length; i++) {
    this.leadData[i].isSelected = this.masterSelected;
  }
  this.getCheckedItemList();
}
isAllSelected() {
  this.masterSelected = this.leadData.every(function (item: any) {
    return item.isSelected == true;
  })
  this.getCheckedItemList();
}

getCheckedItemList() {
  this.checkedList = [];
  for (var i = 0; i < this.leadData.length; i++) {
    if (this.leadData[i].isSelected)
      this.checkedList.push(this.leadData[i]);
  }
  this.checkedList = JSON.stringify(this.checkedList);
}

}
