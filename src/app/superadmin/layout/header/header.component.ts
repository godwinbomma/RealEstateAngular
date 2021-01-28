import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { AuthServiceService } from '../../../service/auth-service.service';
import * as $ from 'jquery';

import { element } from 'protractor';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public noficationshow: boolean = false;
  public notificationLead: any={notificationsCount:0};
customername:string;
  showClassName:boolean = true;
  form: FormGroup;
  identification: FormGroup;
  UserName : string ='';
  userDetails: any = [];
  Identification:any = [];
  PropertyList: any = [];
  propertyTRasactionIds:any;
  exchangeId:number;

  idpropertydata:any = [];
  userDetailsupdate: any = [];
  imageurl : string | ArrayBuffer ="../../../assets/images/superadmin/dp.png";

  @Input() headerMainTitle: string | undefined;


  constructor(private AuthServiceService: AuthServiceService,private formBuilder: FormBuilder, private route: Router,) {
    this.form = this.formBuilder.group({
      orders: new FormArray([])
    });
  }

  ngOnInit(): void {
    debugger;
    this.userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
     this.userDetailsupdate = JSON.parse(sessionStorage.getItem("Userdetailupdate")) || null;
     if(this.userDetailsupdate!=null)
     {
      if(this.userDetailsupdate['fullName']!=this.userDetails['fullName'] || this.userDetailsupdate['profilePath']!=this.userDetails['profilePath'])
      {
        this.UserName = this.userDetailsupdate['fullName'];
        this.imageurl= this.userDetailsupdate['profilePath'] ?? this.imageurl;
        
      }
      else
      {
        this.UserName = this.userDetails['fullName'];
        this.imageurl= this.userDetails['profilePath'] ?? this.imageurl;
      }
     }
     else
     {
      this.UserName = this.userDetails['fullName'];
        this.imageurl= this.userDetails['profilePath'] ?? this.imageurl;
     }
   
    
    this.getNotification();
    $(document).ready(function(){
      $(".newhead_room.dropdown-menu li:last-child").click(function(){
        $('.ldd').toggleClass("popup-static");
      });
    });
    $(document).ready(function(){
      $(".btn_Cancel").click(function(){
        $('.ldd').removeClass("popup-static");
      });

    });
  }

  getpropertyvalue(id:number,event:any)
  { 
    console.log(event);
    if(event == true){
      this.idpropertydata.push(id);
      console.log(this.idpropertydata,"idpropertydata")
      var stringFromArr = this.idpropertydata.join(',');
      this.propertyTRasactionIds = stringFromArr;
      console.log(stringFromArr,"stringFromArr");
      console.log(this.propertyTRasactionIds,"propertyTRasactionIds");
    }else{
       this.idpropertydata.pop(id);
       console.log(this.idpropertydata,"idpropertydata")
       var stringFromArr = this.idpropertydata.join(',');
       this.propertyTRasactionIds = stringFromArr;
       console.log(this.propertyTRasactionIds,"propertyTRasactionIds");
    }
  
  
 }



  getNotification() {
    debugger;
    this.AuthServiceService._get_Notification(+this.userDetails['userId']).subscribe((data: any)=> {
      if(data.error=="No notification exists" || data.error=="Failure")
      {
    this.notificationLead.notificationsCount="";
      }
      else
      {
        this.notificationLead = data.responseData;
      }
      console.log(data);
      })
    
  }
//exchangeid
  getreplacement(exchangeid:number,username:string) {
    debugger;
    this.exchangeId = exchangeid;
    this.customername=username;
    console.log(this.exchangeId,"exchangeId");
    this.AuthServiceService._get_Identification(exchangeid).subscribe((data: any)=> {
    this.PropertyList=data.response.propertyList;
    })    
  }

  identificationproperty(){
    let reqPayload = {
     "exchangeId":this.exchangeId,
    //  "propertyTRasactionIds":this.propertyTRasactionIds,
    //  "isIdentifiedAprroved":true
    }
    console.log(reqPayload,"reqPayload");
    this.AuthServiceService.identityProperty(reqPayload).subscribe((data: any) => {
      this.route.navigate(['superadmin/dashboard']);
       console.log(data);
     })
  }

  clearNotification()
  {
this.AuthServiceService._get_NotificationRead(+this.userDetails['userId']).subscribe((data: any) => {
  this.notificationLead = data.responseData;
   console.log(data);
 })
  }

  bellButton() {
    this.noficationshow = !this.noficationshow
    
  }
  closeButton() {
    this.noficationshow = false;
  }
  navigateTo(exchangeId:number,propertyId:number,screenid:number){

    if(screenid=1){
      this.route.navigate(['/exchange/list']);
      this.closeButton();
    }
    else if (screenid=2)
    {
this.route.navigate(['/exchange/approvaldetail',{id:exchangeId, id2:propertyId }])
this.closeButton();
    }
    else if (screenid=3)
    {
      this.route.navigate(['/exchange/view',{id:exchangeId, id2:propertyId }]);
      this.closeButton();

    }
    else if (screenid=4)
    {

    }
 
  }
}
