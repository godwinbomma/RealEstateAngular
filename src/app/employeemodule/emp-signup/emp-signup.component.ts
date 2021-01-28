import { Component, OnInit, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import {Router} from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { AddSignupModel } from '../../models/signup.model';
import { ToastrService } from 'ngx-toastr';
import { data } from 'jquery';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-emp-signup',
  templateUrl: './emp-signup.component.html',
  styleUrls: ['./emp-signup.component.css']
})
export class EmpSignupComponent implements OnInit {
 
  CustomerSignupForm: FormGroup;
  signupDetails: any = {};
  @ViewChild('passwordToggle') passwordToggle: ElementRef;
  @ViewChild('passwordToggle') passwordToggle1: ElementRef;
  constructor( 
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private toastr: ToastrService,
    private route: Router
    
    ) { }

  ngOnInit(): void {
 
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

  Signup()
  {

     debugger;
     if(this.signupDetails.Password==this.signupDetails.ConfirmPassword)
   {
     let jsonObj = {
      
        "firstName":this.signupDetails.firstName,
        "lastName": this.signupDetails.lastName,
        "password":this.signupDetails.Password,
        "confirmPassword": this.signupDetails.ConfirmPassword,
        "emailAddress": this.signupDetails.emailAddress,
        "mobileNo": this.signupDetails.mobileNo,
        "userTypeId": 2,
      
      //userDetails['userId'],
      }
      this.authService.postApiCall("/api/V1/Accounts/Register", jsonObj).subscribe((data:any) => {
        debugger;
        console.log(data);
        if(data.iSsuccessResponse == true)
        {
        this.toastr.success(data.response);
        this.route.navigate(['employee/login']);
        }
        else
        {
          this.toastr.error(data.error);
        }
      }, error => {
        
      })
    }
  
  else
  {
    this.toastr.error("Password Mismatch");
  }
}
  }
