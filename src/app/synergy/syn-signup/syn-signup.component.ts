import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {Router} from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { AddSignupModel } from '../../models/signup.model';
import { ToastrService } from 'ngx-toastr';
import { data } from 'jquery';

@Component({
  selector: 'app-syn-signup',
  templateUrl: './syn-signup.component.html',
  styleUrls: ['./syn-signup.component.css']
})
export class SynSignupComponent implements OnInit {

  signupForm: FormGroup;
  signupDetails: any = {};
  constructor( 
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private toastr: ToastrService,
    private route: Router
    
    ) { }

  ngOnInit(): void {
 
  }

  Signup()
  {
     let jsonObj = {
        "firstName":this.signupDetails.firstName,
        "lastName": this.signupDetails.lastName,
        "password":this.signupDetails.Password,
        "confirmPassword": this.signupDetails.ConfirmPassword,
        "emailAddress": this.signupDetails.emailAddress,
        "mobileNo": this.signupDetails.mobileNo,
        "userTypeId": 3,
      //userDetails['userId'],
      }
      this.authService.postApiCall("/api/V1/Accounts/Register", jsonObj).subscribe((data:any) => {
        debugger;
        console.log(data);
        if(data.iSsuccessResponse == true)
        {
        this.toastr.success(data.response);
        this.route.navigate(['synergy/login']);
        }
        else
        {
          this.toastr.error(data.error);
        }
      }, error => {
        
      })
    }
    
  }

