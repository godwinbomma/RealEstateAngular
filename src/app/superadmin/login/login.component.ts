import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import { TokenService } from '../../service/token.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IpServiceService } from '../../service/ip-service.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginDetails: any = {};
  ipAddress: any;

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
    this.authService.postApiCall("/api/V1/Accounts/Login", jsonObj).subscribe((data: any) => {

      if (data.iSsuccessResponse == true) {

        if (data.response == 'Successfully Logged In') {
          if (data.userData.userTypeId == 1) {
            sessionStorage.setItem("userDetails", JSON.stringify(data['userData']));
            sessionStorage.setItem("token", JSON.stringify(data['token']));

            let token = JSON.parse(sessionStorage.getItem("token")) || null;
            this.tokenStorage._save_token(token);
            this.toastr.success(data.response);
            this.route.navigate(['superadmin/dashboard']);
          }
          else {
            this.toastr.error('Invalid MailId/Password!');
          }
        }
        else if (data.response !="Invaild Mobile number or Email") {
          this.toastr.success(data.response);
          this.route.navigate(['/superadmin/two-factor'], { state: { userName: this.loginDetails.UserName, password: this.loginDetails.Password } });
        }
        else{
          this.toastr.error('Invalid Mobile Number');
        }



      }
      else {
        this.toastr.error('Invalid MailId/Password!');
      }
    }, (err: any) => {
      //debugger;
      this.toastr.error('Invalid MailId/Password!');

    })


  }

}
