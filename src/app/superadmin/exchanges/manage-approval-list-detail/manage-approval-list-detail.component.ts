import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExchangeService } from '../../../service/exchange.service';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../../../../../src/app/service/contact.service';

@Component({
  selector: 'app-manage-approval-list-detail',
  templateUrl: './manage-approval-list-detail.component.html',
  styleUrls: ['./manage-approval-list-detail.component.css']
})
export class ManageApprovalListDetailComponent implements OnInit {
  Exchanges: any = {contactid:'',Email:'',Phone:''};
  fileName: any;
  file: any;
  AssignEmployeeForm: FormGroup;
  AssignExchangeDropdownList: any = {};
  AssignconExchangeDropdownList: any = {};
  AssignsynExchangeDropdownList: any = {};
  ExchangeId : number;
  PropertyId : number;
  userDetails : any = [];
  today: string ='';
  myDate = new Date();
  filesSelected: any = [];
  issynergy: boolean = false;
  issynergycon: boolean = false;
  ContactsCF: any = {};
  datePickerConfig = { format: 'MM/DD/YYYY' };
  Contacts : any ={userTypeId:3};
  Statedetails:any = [];
  Citydetails:any = [];
  Statedata:any = [];
  Citydata :any= [];
  constructor(
  private exchangeservice: ExchangeService,
  private route: Router,
  private formBuilder: FormBuilder,
  private activated_route: ActivatedRoute,
  private datePipe: DatePipe,
  private contactservice: ContactService,
  private toastr: ToastrService,
  private ExchangeService: ExchangeService,
  )
  
  {
    this.AssignEmployeeForm = this.formBuilder.group({
      EmployeeId: new FormControl('', Validators.required),
      TaskId: new FormControl('', Validators.required),
      Issynergy: new FormControl(0, Validators.required),
      SynergyId: new FormControl(0, Validators.required),
      IsEscrowdocumentsattached: new FormControl(false),
      Isrequestednotyetreceived: new FormControl(false),
      IsrequestEscrowdocuments: new FormControl(false),
      Notes: new FormControl(''),
      File: new FormControl(),
  }
  );
  
  }
  
  ngOnInit(): void {
    debugger;
      this.today = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');    
      this.activated_route.params.subscribe(params => {
      this.ExchangeId = Number(params['id']);
      this.PropertyId = Number(params['id2']);
        });
        this.userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
  
      $(document).ready(function(){
          $('.cipt').click(function(){
          $('.custom_ipt').prop('checked',false);
          $(this).closest('input').prop('checked',true);
          });
          });    
  this.getdropdownList();
  this.getStatelist();
  this.getsyndropdownList();
  
  }
  
  //trigger() {
  // debugger;
  // let element = document.getElementById('upload_file') as HTMLInputElement;
  // element.click();
  //}
  getStatelist(){
    this.ExchangeService._getStateslist().subscribe((data:any) =>{
      // this.Statedetails = data;
      this.Statedata = data.userData

      console.log(this.Statedetails,"this.Statedetails")
      console.log(this.Statedata,"StateData");
    })
  }

  statechange(stateId:any){
    console.log(stateId);
    this.ExchangeService.getCityliste(stateId).subscribe((data:any) =>{
      this.Citydetails = data;
      this.Citydata = data.userData

      console.log(this.Citydetails,"this.Citydetails")
      console.log(this.Citydata,"Citydata");
    })
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
  


  onSelectMultipleFile(event: any) {
    debugger;
    console.log("file ", event.target.files);
    for (var i = 0; i < event.target.files.length; i++){
      if (event.target.files[i]) {
        console.log("file ===>onUploadMultipleFile", event.target.files[i].name);
        console.log(" file.files ", event.target.files[i]);
        var file = event.target.files[i]
        file.date = new Date()
        this.filesSelected.push(file)
        console.log("this.filesSelected ", this.filesSelected);
      }
    }
   
  }
  synergyisrequired()
  {
    debugger;
    if(this.AssignEmployeeForm.controls.Issynergy.value==1)
    {
      this.issynergy=true;
    }
    else
    {
      this.issynergy=false;
    }
  }
  
  assignemployee() {
  debugger;
  if (this.AssignEmployeeForm.invalid) {
  this.AssignEmployeeForm.markAllAsTouched();
  } else {
  debugger;
   if(this.AssignEmployeeForm.controls.Issynergy.value==1 && this.AssignEmployeeForm.controls.SynergyId.value=="")
   {
    this.toastr.error('Please select Synergy');
   }   
   else
   { 
    let jsonObj = {
      "ExchangeId":this.ExchangeId,
      "EmployeeId": this.AssignEmployeeForm.controls.EmployeeId.value,
      "TaskId": this.AssignEmployeeForm.controls.TaskId.value,
      "PropertyId":this.PropertyId,
      "SynergyClientId": this.AssignEmployeeForm.controls.SynergyId.value,
      "IsSynergyClient": this.AssignEmployeeForm.controls.Issynergy.value,
      "EscrowDocumentsAreAttached": this.AssignEmployeeForm.controls.Isrequestednotyetreceived.value,
      "EscrowDocumentsRequestedNotYetReceived": this.AssignEmployeeForm.controls.IsrequestEscrowdocuments.value,
      "PleaseRequestEscrowDocuments": this.AssignEmployeeForm.controls.IsrequestEscrowdocuments.value,
      "Notes": this.AssignEmployeeForm.controls.Notes.value,
      "FileList":  this.filesSelected,
      "CreatedBy":+this.userDetails['userId']
      }
      this.exchangeservice._AssignEmployee(jsonObj).subscribe((success:any) => {
          debugger;
          let jsonObj = {
              "exchangeId": this.ExchangeId,
              "updatedBy": +this.userDetails['userId'],
              "updatedOn": this.today,
              "isActive": 1,
              "isAdminProveed": 1
            }
            this.exchangeservice.postApiCall("/api/V1/Exchange/ApproveExchange", jsonObj).subscribe((data:any) =>{
              if(data.iSsuccessResponse == true)
              {
              this.toastr.success('Employee assigned successfully');
              this.route.navigate(['exchange/approval/list']);
              }
              else
              {
                this.toastr.error('Failed');
              }
              
            })
      
      }, (error:any) => {
      // this.toast.error(error['error']);
      })
      }
   }

   
  
  }
  
  getdropdownList() {
  debugger;
  this.exchangeservice._AssignExchangeListDropdown().subscribe((data: any) => {
  console.log(data)
  debugger;
  this.AssignExchangeDropdownList = data['userData'];
  })
  
  }
  
  close(){
    debugger;
    this.Contacts.userTypeId ='';
    this.Contacts.firstName ='';
    this.Contacts.lastName ='';
    this.Contacts.emailAddress='';
    this.Contacts.mobileNumber='';
    this.Contacts.faxNumber='';
    this.Contacts.mailingAddress='';
    this.Contacts.notes='';
    this.Contacts.companyname='';
    this.Contacts.citys='';
    this.Contacts.states='';
    this.Contacts.zip='';
  }


  addContact() {
    debugger;
    if(this.Contacts.firstName==undefined||this.Contacts.lastName==undefined||this.Contacts.mobileNumber==undefined||this.Contacts.emailAddress==undefined||this.Contacts.mailingAddress==undefined)
    {
        this.toastr.error("Please enter all required fields");
    }
    else
    {
        let userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
       
            let jsonObj = {
             
              "userTypeId": parseInt(this.Contacts.userTypeId),
              "companyName":this.Contacts.companyname,
              "firstName":  this.Contacts.firstName,
              "lastName": this.Contacts.lastName,
              "emailAddress": this.Contacts.emailAddress,
              "mobileNumber": this.Contacts.mobileNumber,
              "officeNumber": "string",
              "faxNumber": this.Contacts.faxNumber,
              "address": this.Contacts.mailingAddress,
              "status": "string",
              "notes": "string",
              "isActive": 1,
              "createdBy": userDetails['userId'],
              "createdOn": new Date(),
              "customFields": this.ContactsCF?this.ContactsCF:[]
       
              }
              this.contactservice.postApiCall("/api/V1/Contacts/AddContact", jsonObj).subscribe((data:any) => {
                debugger;
                if(data.result==true || data.iSsuccessResponse == true)
                {
                    this.toastr.success('Contact created successfully');
                    document.getElementById('close-modal').click();
                    this.getdropdownList();
                    this.AssignEmployeeForm.controls.SynergyId=data.contact.userId.toString();
                    
                }
                else{
                    this.toastr.error(data.error);
                    
                    
                 
                }
               
              
              }, (error:any) => {
        
              })
          }
          
    
       
    
  }

  getcontactcustomfield() {
    debugger;
    this.exchangeservice._getcontactcustomfield().subscribe((data: any)=> {
      this.ContactsCF = data.userData;
     // this.DbExchangeList = data.userData;
      console.log(data);
      }, error => {
  
      })
    }
  
    consynergyisrequired()
    {
      debugger;
      if(this.Contacts.issynergyrequire==1)
      {
        this.issynergycon=true;
      }
      else
      {
        this.issynergycon=false;
      }
    }

    getcondropdownList() {
      debugger;
      this.contactservice.SynergyExecutiveContactList().subscribe((data: any) => {
      console.log(data)
      debugger;
      this.AssignconExchangeDropdownList = data['userData'];
      })
      
      }

      getsyndropdownList() {
        debugger;
        this.contactservice._synergyContactListDropdown().subscribe((data: any) => {
        console.log(data)
        debugger;
        this.AssignsynExchangeDropdownList = data['userData'];
        })
        
        }

  }