import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IDayCalendarConfig, DatePickerComponent } from "ng2-date-picker";
import { AuthServiceService } from '../../service/auth-service.service';
import { TokenService } from '../../service/token.service';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent implements OnInit {
  Profile: any = [];
  Userdetailupdate :any=[];
  userId : number =0;
  FileToupload: any;
  file: File;
  isEdit:boolean=true;

  datePickerConfig = { format: 'MM/DD/YYYY' };
  @ViewChild('passwordToggle') passwordToggle: ElementRef;
  @ViewChild('passwordToggle1') passwordToggle1: ElementRef;
  imageurl : string | ArrayBuffer ="../../../assets/images/superadmin/dp.png";
 
  constructor(
    private auth: AuthServiceService,
    private tokenStorage: TokenService,
    private route: Router,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private toastr: ToastrService


  ) { }

  ngOnInit(): void {

    this._getProfile();
  }
  
  onChange(file: File) {
    debugger;
    if (file) {
      //this.fileName = file.name;
      this.FileToupload = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = event => {
        this.imageurl = reader.result;
      };
    }
  }

  isEditOrCancelRep() {
    var self = this;
    self.isEdit = !self.isEdit;
  }

  RemoveProfile() {

    this.imageurl = "../../../assets/images/superadmin/dp.png";
    
  }
  toggleClick() {
    //$('.login-input-bx').attr('type', 'text');
    let type = this.passwordToggle.nativeElement.type;
    this.passwordToggle.nativeElement.type = (type == "password") ? "text" : "password";
  }
  toggleClick1() {
    //$('.login-input-bx').attr('type', 'text');
    let type = this.passwordToggle1.nativeElement.type;
    this.passwordToggle1.nativeElement.type = (type == "password") ? "text" : "password";
  }

  Updateprofile() {
    debugger;
if(this.Profile.password==this.Profile.confirmpassword)
{
    let dateofbirth = this.datePipe.transform(new Date(this.Profile.dob), 'MM/dd/yyyy');
    var date = new Date(dateofbirth);
    console.log(date.toDateString());
      let userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
      let jsonObj = {
        "UserId": userDetails['userId'],
        "FirstName": this.Profile.firstName,
        "LastName": this.Profile.lastName,
        "EmailAddress": this.Profile.emailAddress,
        "MobileNo": this.Profile.mobileNo,
        "DOB": date.toDateString(),
        "password": this.Profile.password,
        "ConfirmPassword": this.Profile.confirmpassword,
        "File": this.FileToupload
      }

    this.auth._updateProfile_service(jsonObj).subscribe((success:any) => {
      debugger;
      this.Userdetailupdate=success.userData;
      sessionStorage.setItem("Userdetailupdate", JSON.stringify(success['userData'])); 
      this.toastr.success('Profile updated successfully');
      this.route.navigate(['superadmin/dashboard']);
      
      this._getProfile();
        debugger;
      }, (error:any) => {

      })
    }
    else{
      this.toastr.error('Password MisMatch');
    }
  }

  _getProfile() {
    debugger;
    let userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
    this.userId  =  userDetails['userId'];
    this.auth._getProfile_service(this.userId).subscribe((Data: any) => {
      debugger;
      Data.userData.dob = this.datePipe.transform(new Date(Data.userData.dob), 'MM/dd/yyyy');
      this.imageurl= Data.userData.profilePath ?? this.imageurl;
      this.Profile = Data.userData;
      this.Profile.confirmpassword=Data.userData.password;
    }, (error:any) => {

    })

  }
}
