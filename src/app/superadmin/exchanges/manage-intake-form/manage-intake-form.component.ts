import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExchangeService } from '../../../service/exchange.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { ContactService } from '../../../../../src/app/service/contact.service';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-manage-intake-form',
    templateUrl: './manage-intake-form.component.html',
    styleUrls: ['./manage-intake-form.component.css']
})
export class ManageIntakeFormComponent implements OnInit {
    TemplateData : any = [];
    ClientContactDropdownList: any = [];
    ClientContactDropdownListSearch: any = [];
    SynergyContactDropdownList: any = [];
    SynergyContactDropdownListSearch: any = [];
    SettlementAgent:string;
    Exchanges: any = {contactid:'',Email:'',Phone:''};
    ContactsCF: any = {};
    previlegesLists:any={};
    AssignExchangeDropdownList: any = {};
    userDetails: any = [];
    datePickerConfig = { format: 'MM/DD/YYYY' };
    Contacts : any ={userTypeId:4};
    Statedetails:any = [];
    Citydetails:any = [];
    Statedata:any = [];
    Citydata :any= [];
    closeResult: string;
    getDismissReason: any;
    contactype:number;
    issynergy: boolean = false;
  userId: any;
  UserRes: any;
    constructor(
        private formBuilder: FormBuilder,
        private activated_route: ActivatedRoute,
        private ExchangeService: ExchangeService,
        private contactservice: ContactService,
        private modalService:NgbModal,
        private route: Router,
        private toastr: ToastrService,
        private datePipe: DatePipe
    ) {


    }

    // getcontactvalues(ContactId:number)
    // {
    //   this.contactservice.__getContactdetails_byId(ContactId).subscribe((data: any) => {
    //     console.log(data)
    //     debugger;
    //     this.Exchanges.Email = data['userData']['emailAddress'];
    //     this.Exchanges.Phone = data['userData']['mobileNumber'];

    //   })
    // }

    //  getescrowcontactvalues(ContactId:number)
    //  {
    //    debugger;
    //  this.contactservice.__getContactdetails_byId(ContactId).subscribe((data: any) => {
    //      console.log(data)
    //    debugger;
    //      this.Exchanges.EscrowOfficerEmail = data['userData']['emailAddress'];
    //      this.Exchanges.EscrowPhone = data['userData']['mobileNumber'];
    //     this.Exchanges.SettlementAgentname=data['userData']['firstName'];
    //      this.Exchanges.EscrowCompany=data['userData']['companyName'];


    //    })
    //  }
//api integration for StateList dropdown
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

    ngOnInit(): void {

        this.userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
        this.getContactdropdownList();
        this.getcontactcustomfield();
        this.getStatelist();

        this.userId=this.activated_route.snapshot.paramMap.get('id');
if(this.userId){
 this.ExchangeService._createExchange(this.userId).subscribe(res=>{
    //console.log("my res",res);
     this.UserRes=res.userData;
     if(this.UserRes){
  //console.log(typeof(this.Exchanges.debt), typeof((this.UserRes.debitOfProperty)))
this.Exchanges.contactid=(this.UserRes.userId).toString();
    this.Exchanges.Email= this.UserRes.customerEmail;
    this.Exchanges.Phone= this.UserRes.customerPhoneNumber;
    this.Exchanges.state= this.UserRes.state;
    this.Exchanges.RelinquishedAddress= this.UserRes.propertyAddress;
    this.Exchanges.city= this.UserRes.city;
    this.Exchanges.zip= this.UserRes.zipcode;
    this.Exchanges.SettlementAgent= this.UserRes.officerId.toString()?this.UserRes.officerId.toString():0;
    this.Exchanges.EscrowOfficerEmail= this.UserRes.officerEmail;
    this.Exchanges.EscrowPhone= this.UserRes.officerPhone;
    this.Exchanges.EscrowCompany= this.UserRes.companyName;
    this.Exchanges.Propertytitle= this.UserRes.propertyTitle;
  this.Exchanges.debt= this.UserRes.debitOfProperty;
  this.Exchanges.SalesPrice= this.UserRes.valueOfProperty;
  this.Exchanges.Referral= this.UserRes.referralSource;
  this.Exchanges.ClosingDate=this.UserRes.expectedClosingDate? moment(this.UserRes.expectedClosingDate).format("MM/dd/yyyy"):null;
  this.Exchanges.Notes= this.UserRes.notes;
     }
  })
}


    }



    addExchange() {
        debugger;
        if(this.Exchanges.ClosingDate==undefined)
        {
          this.Exchanges.ClosingDate=new Date();
        }
        let dateofbirth = this.datePipe.transform(new Date(this.Exchanges.ClosingDate), 'yyyy-dd-MM');
        var date = new Date(dateofbirth);
        // let state = parseInt.Exchanges.state
        let jsonObj = {

            "userId": +this.Exchanges.contactid,
            "loginUserId": this.userDetails['userId'],
            "officerName": this.Exchanges.SettlementAgentname?this.Exchanges.SettlementAgentname:",",
            "officerId":+this.Exchanges.SettlementAgent?+this.Exchanges.SettlementAgent:0,
            "companyName": this.Exchanges.EscrowCompany?this.Exchanges.EscrowCompany:",",
            "officerPhone": this.Exchanges.EscrowPhone?this.Exchanges.EscrowPhone:",",
            "officerEmail": this.Exchanges.EscrowOfficerEmail?this.Exchanges.EscrowOfficerEmail:",",
            "propertyTitle": this.Exchanges.Propertytitle?this.Exchanges.Propertytitle:"N/A",
            "zipcode":this.Exchanges.zip,
            "state": parseInt(this.Exchanges.state),
            "city": this.Exchanges.city,
            "expectedClosingDate": new Date(this.Exchanges.ClosingDate)?new Date(this.Exchanges.ClosingDate):new Date(),
            "referralSource": this.Exchanges.Referral? this.Exchanges.Referral:"No Refferal",
            "date": new Date(),
            "valueOfProperty": +this.Exchanges.SalesPrice?+this.Exchanges.SalesPrice:0,
            "debitOfProperty": +this.Exchanges.debt?+this.Exchanges.debt:0,
            "propertyAddress": this.Exchanges.RelinquishedAddress,
            "ownershipInterest": "0",
            "note": this.Exchanges.Notes
            //userDetails['userId'],
        }
        // return false;
        console.log(jsonObj,"jsonObj");
        this.ExchangeService.postApiCall("/api/V1/Exchange/AddExchange", jsonObj).subscribe((success:any) => {
            debugger;
            if(success.response=="Property title Exist")
            {
              this.toastr.error('Property Title already exist');
             // this.route.navigate(['exchange/approval/list']);
            }
            else{
              this.toastr.success('Exchange created successfully');
              this.route.navigate(['exchange/approval/list']);
            }

        }, error => {

        })
    }
    getContactdropdownList() {
        debugger;
        debugger;
        this.contactservice._ContactListDropdownVal().subscribe((data: any) => {
          console.log(data)
          debugger;
          this.ClientContactDropdownList = data['userData'];
          this.ClientContactDropdownListSearch=data['userData'];
          this.SynergyContactDropdownList = data['userData'];
          this.SynergyContactDropdownListSearch=data['userData'];
         // this.Exchanges.contactid=data['contact']['userid'];
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

                      "UserId": userDetails['userId'],
                      "UserTypeId": parseInt(this.Contacts.userTypeId),
                      "synergyId": this.Contacts.synergyId,
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
                      "monthlyAccount": this.Contacts.monthlyAccount,
                      "createdOn": new Date()

                      }
                      this.contactservice.postApiCall("/api/V1/Contacts/AddContact", jsonObj).subscribe((data:any) => {
                        debugger;
                        if(data.result==true || data.iSsuccessResponse == true)
                        {
                            this.toastr.success('Contact created successfully');
                            document.getElementById('close-modal').click();
                            this.getContactdropdownList();
                            if(this.contactype==1)
                            {
                              this.Exchanges.contactid=data.contact.userId.toString();
                            }
                            else if(this.contactype==2)
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

          getcontactcustomfield() {
            debugger;
            this.ExchangeService._getcontactcustomfield().subscribe((data: any)=> {
              this.ContactsCF = data.userData;
             // this.DbExchangeList = data.userData;
              console.log(data);
              }, error => {

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
          getUserData(id:number){
debugger;
          //  this._getContactdetails_byId(cId)
            this.contactype=id;
           // this.open(modal);
           }

           open(content) {
            this.modalService.open(content).result.then((result) => {
              this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
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

          getdropdownList() {
            debugger;
            this.contactservice.SynergyExecutiveContactList().subscribe((data: any) => {
            console.log(data)
            debugger;
            this.AssignExchangeDropdownList = data['userData'];
            })
            
            }
}
