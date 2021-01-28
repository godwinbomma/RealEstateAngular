import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import { TokenService } from '../../service/token.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-syn-forgot-password',
  templateUrl: './syn-forgot-password.component.html',
  styleUrls: ['./syn-forgot-password.component.css']
})
export class SynForgotPasswordComponent implements OnInit {

  email :any ={};
  constructor(private auth_service : AuthServiceService , private route: Router) { }
  ngOnInit(): void {
  }
  _forgot_password(){
    debugger;
    this.auth_service._forgot_password(this.email).subscribe(data=>{
      console.log(data)
      
      alert("Password Link sent to ur mail, kindly check it")
      this.route.navigate(['\login'])
    
  })
  }

}
