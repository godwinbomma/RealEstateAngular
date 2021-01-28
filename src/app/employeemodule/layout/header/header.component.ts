import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import{ AuthServiceService} from '../../../service/auth-service.service';
import * as $ from 'jquery';
import { element } from 'protractor';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public noficationshow: boolean = false;
  public notificationLead: any={};

  showClassName:boolean = true;
  UserName : string ='';
  userDetails: any = [];
  userDetailsupdate: any = [];
  imageurl : string | ArrayBuffer ="../../../assets/images/superadmin/dp.png";

  @Input() headerMainTitle: string | undefined;

  constructor(private AuthServiceService: AuthServiceService) {

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

  getNotification() {
    debugger;
    this.AuthServiceService._get_Notification(+this.userDetails['userId']).subscribe((data: any)=> {
      if(data.error=="No notification exists")
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
 
}
