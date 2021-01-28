import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import{ ExchangeService} from '../../service/exchange.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { ContactService } from '../../service/contact.service';

@Component({
  selector: 'app-cus-exchange',
  templateUrl: './cus-exchange.component.html',
  styleUrls: ['./cus-exchange.component.css']
})
export class CusExchangeComponent implements OnInit {
 
  userDetails: any = [];
  Statedata:any = [];
  datePickerConfig = { format: 'MM/DD/YYYY' };
  ClientContactDropdownList: any = [];
  SettlementAgent:string;
    ClientContactDropdownListSearch: any = [];
    SynergyContactDropdownList: any = [];
    SynergyContactDropdownListSearch: any = [];
    Contacts : any =[];
    ContactsCF:any=[];
    Exchanges: any = {contactid:'',Email:'',Phone:''};
  constructor(
  private formBuilder: FormBuilder,
  private contactservice: ContactService,
  private activated_route: ActivatedRoute,
  private ExchangeService: ExchangeService,
  private route: Router,
  private toastr: ToastrService,
  private datePipe: DatePipe
  ) { }
  
  ngOnInit(): void {
  this.getStatelist();
  this.userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
  this.getContactdropdownList();
  }
  getContactdropdownList() {
    debugger;
   
    this.contactservice._ClientContactListDropdown().subscribe((data: any) => {
      console.log(data)
      debugger;
      this.ClientContactDropdownList = data['userData'];
      this.ClientContactDropdownListSearch=data['userData'];
      })
      this.contactservice._synergyContactListDropdown().subscribe((data: any) => {
        console.log(data)
        debugger;
        this.SynergyContactDropdownList = data['userData'];
        this.SynergyContactDropdownListSearch=data['userData'];
        })
    
    }
    getStatelist(){
      this.ExchangeService._getStateslist().subscribe((data:any) =>{
        // this.Statedetails = data;
        this.Statedata = data.userData
       
        // console.log(this.Statedetails,"this.Statedetails")
        console.log(this.Statedata,"StateData");
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
                      this.getContactdropdownList();
                      if(data.contact.userType==4)
                      {
                        this.Exchanges.contactid=data.contact.userId.toString();
                      }
                      else if(data.contact.userType==3)
                      {
                        this.Exchanges.SettlementAgent=data.contact.userId.toString();
                      }
                  }
                  else{
                      this.toastr.error(data.error);
                      
                      
                   
                  }
                 
                
                }, (error:any) => {
          
                })
            }
            
      
         
      
    }
  addExchange() {
  debugger;
  let jsonObj = {
    "userId":  this.userDetails['userId'],
    "loginUserId": this.userDetails['userId'],
    "officerName":  this.Exchanges.SettlementAgent,
    "companyName": this.Exchanges.EscrowCompany,
    "officerPhone": this.Exchanges.EscrowPhone.toString(),
    "officerEmail": this.Exchanges.EscrowOfficerEmail,
    "propertyTitle": this.Exchanges.Propertytitle,
    "expectedClosingDate": new Date(),
    "referralSource": "Self",
    "date": new Date(),
    "valueOfProperty": +this.Exchanges.SalesPrice,
    "debitOfProperty": +this.Exchanges.debt,
    "propertyAddress": this.Exchanges.RelinquishedAddress,
    "ownershipInterest": "0",
    "note": this.Exchanges.Notes,
    "zipcode":this.Exchanges.zip,
    "state":this.Exchanges.state,
    "city": this.Exchanges.city,
    //userDetails['userId'],
    }
    
    this.ExchangeService.postApiCall("/api/V1/Exchange/AddExchange", jsonObj).subscribe(success => {
    debugger;
    this.toastr.success('Exchange created successfully', "");
  this.route.navigate(['customer/cus-dashboard-inchange']);
  }, error => {
  
  })
  }
  getescrowcontactvalues(ContactId:number)
  {
    this.contactservice.__getContactdetails_byId(ContactId).subscribe((data: any) => {
      console.log(data)
      debugger;
      this.Exchanges.EscrowOfficerEmail = data['userData']['emailAddress']; 
      this.Exchanges.EscrowPhone = data['userData']['mobileNumber']; 
      this.SettlementAgent=data['userData']['firstName']; 
      this.Exchanges.EscrowCompany=data['userData']['companyName'];
                
    })
  }
  onSearchUsers(e:any) {
    this.ClientContactDropdownList = this.ClientContactDropdownListSearch.filter((item: any)=> item.fullName.toLowerCase().indexOf(e.target.value) > -1)
    this.SynergyContactDropdownList = this.SynergyContactDropdownListSearch.filter((item: any)=> item.fullName.toLowerCase().indexOf(e.target.value) > -1)
  }
  selectEvent(item: any) {
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something
  }
  }