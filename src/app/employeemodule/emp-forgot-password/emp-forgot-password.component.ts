import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import { TokenService } from '../../service/token.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-emp-forgot-password',
  templateUrl: './emp-forgot-password.component.html',
  styleUrls: ['./emp-forgot-password.component.css']
})
export class EmpForgotPasswordComponent implements OnInit {
  email :any ={};
  constructor(private auth_service : AuthServiceService , private route: Router) { }


  ngOnInit(): void {
  }
  _forgot_password(){
    debugger;
    this.auth_service._forgot_password(this.email).subscribe(data=>{
      console.log(data)
      
      alert("Password Linl sent to ur mail, kindly check it")
      this.route.navigate(['\login'])
     
    
  })
  }

}
