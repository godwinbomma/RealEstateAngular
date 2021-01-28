import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import { TokenService } from '../../service/token.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IpServiceService } from '../../service/ip-service.service';  

@Component({
  selector: 'app-emp-login',
  templateUrl: './emp-login.component.html',
  styleUrls: ['./emp-login.component.css']
})
export class EmpLoginComponent implements OnInit {
  loginForm: FormGroup;
  loginDetails: any = {};
  ipAddress:string;
  @ViewChild('passwordToggle') passwordToggle: ElementRef;
  constructor(
    private auth: AuthServiceService,
    private tokenStorage: TokenService,
    private toastr: ToastrService,
    private route: Router,
    private ip:IpServiceService,
    private formBuilder: FormBuilder,
    private authService: AuthServiceService

  ) { }

  ngOnInit(): void {
    this.getIP();
  }

  getIP()  
  {  
    debugger;
    this.ip.getIPAddress().subscribe((res:any)=>{  
      this.ipAddress=res.ip;  
    });  
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
      "systemIP": this.ipAddress
    }
      this.authService.postApiCall("/api/V1/Accounts/Login", jsonObj).subscribe((data:any) => {
        console.log(data);
        if(data.iSsuccessResponse == true)
        {   
         
            if(data.response=='Successfully Logged In')
            {
              if(data.userData.userTypeId==2)
              {
              this.toastr.success(data.response);
              this.route.navigate(['/employee/dashboard']);        
              sessionStorage.setItem("userDetails", JSON.stringify(data['userData']));  
              let userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;     
              this.tokenStorage._save_token(userDetails['token']); 
            } 
            else
            {
              this.toastr.error('Invalid MailId/Password!');
            }    
            }
            else if (data.response !="Invaild Mobile number or Email") {
              this.toastr.success(data.response);
              this.route.navigate(['/employee/two-factor'], { state: {userName: this.loginDetails.UserName,password:this.loginDetails.Password} }); 
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
        debugger;
        this.toastr.error('Invalid MailId/Password!');        
      })
    
  }

}
