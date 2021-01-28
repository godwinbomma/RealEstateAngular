import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private actionUrl: string;


  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.actionUrl = environment.apiUrl;
  
  }

  _login_service(credentials: any) {

    return this.http.post(this.actionUrl +'api/V1/Login', credentials);
  }

  _forgot_password(email: any) {
    return this.http.post(this.actionUrl +'api/V1/Accounts/ForgotPassword', email)
  }
  _get_AdminNotification(UserId: number): any {
    return this.http.get(this.actionUrl +'/api/V1/Alert/GetAdminNotifications?UserId='+ UserId);
  }
  _get_Notification(UserId: number): any {
    return this.http.get(this.actionUrl +'/api/V1/Alert/GetNotifications?UserId='+ UserId);
  }

  _get_Identification(ExchangeId: number): any {
    return this.http.get(this.actionUrl +'/api/V1/Exchange/GetIdentificationApproval?ExchangeId='+ ExchangeId);
  }
  _get_NotificationRead(UserId: number): any {
    return this.http.get(this.actionUrl +'/api/V1/Alert/NotificationsIsReadTrue?UserId='+ UserId);
  }
 

  _reset_password(credentials: any) {
    return this.http.post(this.actionUrl +'/api/V1/Accounts/ResetPassword', credentials)
  }
  _register_service(Userdetails:any) {
    debugger;
    return this.http.post(this.actionUrl+'/api/V1/Accounts/Register',Userdetails)
  }
 
  _getProfile_service(UserId: number) {
    debugger;
    return this.http.get(this.actionUrl +'/api/V1/Accounts/GetProfile?UserId='+ UserId)
  }
  _otpVerify(otpVerifyReq: any) {
    return this.http.post(this.actionUrl + '/api/V1/Accounts/OTPVerify', otpVerifyReq)
  }
  _otpResend(otpResendReq: any) {
    return this.http.post(this.actionUrl + '/api/V1/Accounts/OTPResend', otpResendReq)
  }

    //identity_property
    identityProperty(data:any) {
      return this.http.post(this.actionUrl + '/api/V1/Exchange/IdentifiedApproval', data);
    }

    approveProperty(data:any) {
      return this.http.post(this.actionUrl + '/api/V1/Exchange/IdentifiedApprovalReplacement', data);
    }
  _updateProfile_service(data: any) {
    debugger;
    const formData: FormData = new FormData();
    formData.append('UserId', data.UserId);
    formData.append('FirstName', data.FirstName);
    formData.append('LastName', data.LastName);
    formData.append('EmailAddress', data.EmailAddress);
    formData.append('MobileNo', data.MobileNo);
    formData.append('Companyname', data.Companyname);
    formData.append('DOB', data.DOB)
    formData.append('File', data.File);
    formData.append('password', data.password);
    formData.append('ConfirmPassword', data.ConfirmPassword);
    return this.http.post(this.actionUrl +'/api/V1/Accounts/Profile',formData)
  }

 

  postApiCall(url: string, data: any) {

    let httpHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let header = {
      headers: httpHeader
    }
    debugger;
    return this.http.post(this.actionUrl + url, data, header)

  }


  getApiCall(url: string) {

    let httpHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let header = {
      headers: httpHeader
    }

    return this.http.get(this.actionUrl + url, header)

  }

}
