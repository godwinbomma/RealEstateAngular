import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import { ContactService } from '../../service/contact.service';
import { ToastrService } from 'ngx-toastr';
import{ ExchangeService} from '../../service/exchange.service';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlertPromise } from 'selenium-webdriver';
@Component({
  selector: 'app-manage-contact-detail',
  templateUrl: './manage-contact-detail.component.html',
  styleUrls: ['./manage-contact-detail.component.css']
})
export class ManageContactDetailComponent implements OnInit {
  addContactForm : FormGroup;
  Contacts: any = {userTypeId:4,TwofactorConfig :2,revenueMonth:false,revenueYear:false,filesMonth:false,filesYear:false,synergyExchange:false,synergyAccounts:false,monthlyAccount:false,issynergyrequire:0};
  datePickerConfig = { format: 'MM/DD/YYYY' };
  ContactsCF: any = [];
  ContactId: number;
  label : string;
  state:string='Add';
  issynergy: boolean = false;
  closeResult: string;
  AssignExchangeDropdownList: any = {};
  Statedetails:any = [];
  Citydetails:any = [];
  Statedata:any = [];
  Citydata :any= [];
  @ViewChild('passwordToggle') passwordToggle: ElementRef;

  //@ViewChild('mymodal') elref: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private toastr: ToastrService,
    private authService: AuthServiceService,
    private contactservice: ContactService,
    private ExchangeService: ExchangeService,
    private activated_route: ActivatedRoute,
    private modalService: NgbModal,
    private exchangeservice: ExchangeService,
  ) { }

  ngOnInit(): void {
 
//    debugger;


    this.label ='ADD CONTACT';
    this.activated_route.params.subscribe(params => {
      this.ContactId = Number(params['id']);
    
    });
    this.label ='ADD CONTACT';
    let contactid = Number.isNaN(this.ContactId);
    if (contactid != true) {
      this.label ='UPDATE CONTACT';
      this.state='Edit';
      //this.updateNegotiator = true;
       this._getContactdetails_byId(this.ContactId)
      }
      else{
        this.getcontactcustomfield();
      }
      this.getdropdownList();
      this.getStatelist();
    
    this.addContactForm = this.formBuilder.group({
     "userTypeId": ['', Validators.required],
     "firstName": ['', Validators.required],
     "lastName": ['', Validators.required],
     "emailAddress": ['', Validators.required],
     "mobileNumber": ['', Validators.required],
     "officeNumber": ['', Validators.required],
     "faxNumber": ['', Validators.required],
     "address": ['', Validators.required],
     "notes": ['', Validators.required]
    })
  
  }
 

ngAfterContentInit(): void {
  //Called after ngOnInit when the component's or directive's content has been initialized.
  //Add 'implements AfterContentInit' to the class.
  
}

  addContact() {
   debugger;
  if(this.Contacts.userTypeId==4 && this.Contacts.companyName==undefined)
  {
    if(this.label=='UPDATE CONTACT')
    {
      let userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
    
      let jsonObj = {
        
          "userId": this.ContactId,
          "UserTypeId": parseInt(this.Contacts.userTypeId),
          "companyName":this.Contacts.companyName,
          "synergyId": this.Contacts.synergyId?this.Contacts.synergyId:0,
          "firstName": this.Contacts.firstName,
          "lastName": this.Contacts.lastName,  
          "officeNumber": this.Contacts.officeNumber,
          "faxNumber": this.Contacts.faxNumber,       
          "address": this.Contacts.mailingAddress,
          "notes": this.Contacts.notes,
           "status": "true",
           "customFields": this.ContactsCF?this.ContactsCF:[],
           "TwofactorConfig ":this.Contacts.TwofactorConfig ,
           "password":this.Contacts.password,
           "revenueMonth": this.Contacts.revenueMonth,
           "revenueYear": this.Contacts.revenueYear,
           "filesMonth": this.Contacts.filesMonth,
           "filesYear": this.Contacts.filesYear,
           "synergyExchange": this.Contacts.synergyExchange,
           "synergyAccounts": this.Contacts.synergyAccounts,
           "monthlyAccount": this.Contacts.monthlyAccount,
           "createdOn": new Date()
        
      }
      this.contactservice.postApiCall("/api/V1/Contacts/UpdateContact", jsonObj).subscribe((data:any) => {
      //  debugger;
        if(data.iSsuccessResponse==true || data.result==true)
        {
          this.toastr.success('Contact updated successfully');
          this.route.navigate(['superadmin/manage-contact']);
        }
        else{
            this.toastr.error(data.error);
            
            
         
        }
       
      }, (error:any) => {

      })
    }
    else{

    
      let userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
      if(userDetails['userId']==7)
      {
         this.Contacts.revenueMonth=false;
           this.Contacts.revenueYear=false;
          this.Contacts.filesMonth=false;
          this.Contacts.filesYear=false;
          this.Contacts.synergyExchange=false;
          this.Contacts.synergyAccounts=false;
          this.Contacts.monthlyAccount=false;
              
        }
     
        let jsonObj = {
          "UserId": userDetails['userId'],
          "UserTypeId": parseInt(this.Contacts.userTypeId),
          "synergyId": this.Contacts.synergyId?this.Contacts.synergyId:0,
          "companyName":this.Contacts.companyName,
          "FirstName": this.Contacts.firstName,
          "LastName": this.Contacts.lastName,
          "EmailAddress": this.Contacts.emailAddress,
          "MobileNumber": this.Contacts.mobileNumber,
          "OfficeNumber": this.Contacts.officeNumber,
          "FaxNumber": this.Contacts.faxNumber,
          "Address": this.Contacts.mailingAddress,
          "Notes": this.Contacts.notes,
          "CreatedBy": userDetails['userId'],
          "customFields": this.ContactsCF?this.ContactsCF:[],
          "twofactorConfig":this.Contacts.TwofactorConfig,
          "revenueMonth": this.Contacts.revenueMonth,
          "revenueYear": this.Contacts.revenueYear,
          "filesMonth": this.Contacts.filesMonth,
          "filesYear": this.Contacts.filesYear,
          "synergyExchange": this.Contacts.synergyExchange,
          "synergyAccounts": this.Contacts.synergyAccounts,
          "monthlyAccount": this.Contacts.monthlyAccount
        }
        this.contactservice.postApiCall("/api/V1/Contacts/AddContact", jsonObj).subscribe((data:any) => {
       //   debugger;
          if(data.iSsuccessResponse ==true|| data.result==true)
          {
            this.toastr.success('Contact created successfully');
            this.route.navigate(['superadmin/manage-contact']);
          }
          else{
              this.toastr.error(data.error);
              
              
           
          }
         
        }, (error:any) => {
  
        })
     
    }
   
  }
  else
  {
    this.toastr.error('Company Name is required ');
  }
      
  }
  getcontactcustomfield() {
    //debugger;
    this.ExchangeService._getcontactcustomfield().subscribe((data: any)=> {
      this.ContactsCF = data.userData;
     // this.DbExchangeList = data.userData;
      console.log(data);
      }, error => {
  
      })
    }
  _getContactdetails_byId(ContactId: number) {
    this.contactservice.__getContactdetails_byId(ContactId).subscribe((data: any) => {
      console.log(data)
      //debugger;
      this.Contacts = data['userData'];
      this.ContactsCF=data['userData']['cfTransationsModel_'];
      if(this.ContactsCF.length==0 || this.ContactsCF==null)
      {
this.getcontactcustomfield();
      }
    })
  }


  toggleClick() {
    //$('.login-input-bx').attr('type', 'text');
    let type = this.passwordToggle.nativeElement.type;
    this.passwordToggle.nativeElement.type = (type == "password") ? "text" : "password";
  }
  
  synergyisrequired()
  {
    debugger;
    if(this.Contacts.issynergyrequire==1)
    {
      this.issynergy=true;
    }
    else
    {
      this.issynergy=false;
    }
  }

  getStatelist(){
    this.ExchangeService._getStateslist().subscribe((data:any) =>{
      // this.Statedetails = data;
      this.Statedata = data.userData

      console.log(this.Statedetails,"this.Statedetails")
      console.log(this.Statedata,"StateData");
    })
  }

  getdropdownList() {
    debugger;
    this.contactservice.SynergyExecutiveContactList().subscribe((data: any) => {
    console.log(data)
    debugger;
    this.AssignExchangeDropdownList = data['userData'];
    })
    
    }

}
