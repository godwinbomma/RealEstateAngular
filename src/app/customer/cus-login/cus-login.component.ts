import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import { TokenService } from '../../service/token.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IpServiceService } from '../../service/ip-service.service';  
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-cus-login',
  templateUrl: './cus-login.component.html',
  styleUrls: ['./cus-login.component.css']
})
export class CusLoginComponent implements OnInit {
  loginForm: FormGroup;
  loginDetails: any = {};
  ipAddress:any;
  @ViewChild('passwordToggle') passwordToggle: ElementRef;
  constructor(
    private auth: AuthServiceService,
    private ip: IpServiceService,
    private tokenStorage: TokenService,
    private toastr: ToastrService,
    private route: Router,
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private http: HttpClient

  ) {
    this.http.get<{ ip: string }>('https://jsonip.com')
      .subscribe(data => {
        console.log('th data', data);
        this.ipAddress = data
      })
  }

  ngOnInit(): void {
    //this.getIP();
  }

  toggleClick() {
    //$('.login-input-bx').attr('type', 'text');
    let type = this.passwordToggle.nativeElement.type;
    this.passwordToggle.nativeElement.type = (type == "password") ? "text" : "password";
  }




  login() {
    debugger;
    let jsonObj = {
      "userName": this.loginDetails.UserName,
      "password": this.loginDetails.Password,
      "systemIP": this.ipAddress.ip
    }
      this.authService.postApiCall("/api/V1/Accounts/Login", jsonObj).subscribe((data:any) => {
        console.log(data);
        if(data.iSsuccessResponse == true)
        {
         
          if(data.response=='Successfully Logged In')
          {
            if(data.userData.userTypeId==4)
            {
            this.toastr.success(data.response);
            this.route.navigate(['/customer/cus-dashboard-inchange']);        
            sessionStorage.setItem("userDetails", JSON.stringify(data['userData'])); 
          }
          else
          {
            this.toastr.error('Invalid MailId/Password!');
          }      
          }
          else if (data.response !="Invaild Mobile number or Email") {
            this.toastr.success(data.response);
            this.route.navigate(['/customer/two-factor'], { state: {userName: this.loginDetails.UserName,password:this.loginDetails.Password} });
          }
          else{
            this.toastr.error('Invalid Mobile Number');
          }

        }
        else
        {
          this.toastr.error('Invalid MailId/Password!');
        }
      },(err:any) => {
        //debugger;
        this.toastr.error('Invalid MailId/Password!');
        
      })
    
  }

}
