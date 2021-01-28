import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { IpServiceService } from 'src/app/service/ip-service.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-two-factor',
  templateUrl: './two-factor.component.html',
  styleUrls: ['./two-factor.component.css']
})
export class TwoFactorComponent implements OnInit {
  public otpDatavalue: any;

  public userdata: any;
  state: any;
  EmailId: any;
  PasswordId: any;
  getOTPvalue: any;
  getOTPResendvalue: any;
  otp: string | undefined;
  otpExpire = false;
  userRouteInfo: any;
  brokerSignedInfo: Boolean = false;
  agentSignedInfo: Boolean = false;
  userDetails : any = [];
  username:string;
  password:string;
  ipAddress:string;
  constructor(  private auth: AuthServiceService,
    private toast: ToastrService,
    private tokenStorage: TokenService,
    private ip:IpServiceService,
    private route: Router) { }

  ngOnInit(): void {
    // console.log(history.state)
    // console.log(history.state.userName);
    this.username=history.state.userName;
    this.password=history.state.password;
    //this.userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
  }

  onOtpChange(otp: any) {
    this.otpDatavalue = otp;
  }

  getOtpVerify() {
    debugger;
    this.getOTPvalue = {
      email:  this.username,
      password: this.password,
      otpValue: this.otpDatavalue,
    };
    // console.log(this.getOTPvalue, 'APIFinal')
    this.auth._otpVerify(this.getOTPvalue).subscribe((login_Response: any) => {
      // console.log(login_Response, 'resOP')
      if (login_Response.response == 'Successfully Logged In') {
        sessionStorage.setItem("userDetails", JSON.stringify(login_Response['userData'])); 
        sessionStorage.setItem("token", JSON.stringify(login_Response['token']));

        let token = JSON.parse(sessionStorage.getItem("token")) || null;
        this.tokenStorage._save_token(token);
       if(login_Response.userData.changepasswordFlag==true)
       {
      
        this.route.navigate(['/synergy/manage-profile']);
       }
       else
       {
        this.route.navigate(['/synergy/dashboard']);
       }
       
       
        }
        
      } );
  
  }
  auth_otpresencvalue() {
    this.getOtpResend();
    // alert('aasd')
  }
  getOtpResend() {
    this.getOTPResendvalue = {
      email: this.username,
      password: this.password,
      systemIP:this.ipAddress
    };
    //timer
    // let rsjx = timer(0, this.tick)
    // this.countDown = Observable.rsjx
    //   .take(this.counter)
    //   .map(() => --this.counter)

    this.otpExpire = true;
    this.auth._otpResend(this.getOTPResendvalue).subscribe((data: any) => {
      console.log(data, 'otpResend');
      if (data.response == true) {
        this.toast.success(data.message);
      } else {
        this.toast.error(data.message);
      }
    });
  }

  getIP()  
  {  
    debugger;
    this.ip.getIPAddress().subscribe((res:any)=>{  
      this.ipAddress=res.ip;  
    });  
  }  
}
