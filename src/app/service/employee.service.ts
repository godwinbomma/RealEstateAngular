import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private actionUrl: string;
  constructor(private http: HttpClient) {  this.actionUrl = environment.apiUrl;}

  _get_previlegeslist(): any {
    return this.http.get( this.actionUrl+'/api/V1/ManageEmployee/GetPrevileges');
  }
  _get_Notes(ExchangeId: number,userid:number): any {
    //debugger;
    return this.http.get( this.actionUrl+'/api/V1/Notes/GetNotes?ExchangeId='+ ExchangeId+'&UserId='+userid);
  }

  _Read_Notes(ExchangeId: number,userid:number,IsRead :boolean): any {
    //debugger;
    return this.http.get( this.actionUrl+'/api/V1/Notes/ReadNotes?ExchangeId='+ ExchangeId+'&UserId='+userid+'&Private='+IsRead);
  }
  _get_Assignlist(UserId: number): any {
    return this.http.get( this.actionUrl+'/api/V1/Exchange/EmployeeAssignedTask?UserId='+ UserId);
  }
  
  _get_ProofOfFunds(ExchangeId: number): any {
    return this.http.get( this.actionUrl+'/api/V1/Exchange/GenerateAccountProof?ExchangeId='+ ExchangeId);
  }
  _get_IDforms(ExchangeId: number): any {
    return this.http.get( this.actionUrl+'/api/V1/Exchange/DownloadIDForm?ExchangeId='+ ExchangeId);
  }
  _get_ExchangeDocument(Propertyid: number): any {
    return this.http.get( this.actionUrl+'/api/V1/Exchange/GenerateExchangeDocument?PropertyId='+ Propertyid);
  }
  _get_Accstatement(ExchangeId: number): any {
    return this.http.get( this.actionUrl+'/api/V1/Exchange/DownloadTrasaction?ExchangeId='+ ExchangeId);
  }

  _get_exchangedocs(Propertyid: number): any {
    const httpOptions = {  
      responseType: 'blob' as 'json'  
    }; 
    return this.http.get( this.actionUrl+'/api/V1/Exchange/DownloadAllDocuments?PropertyId='+ Propertyid, httpOptions);
  }

  _get_ContactFields(): any {
    return this.http.get( this.actionUrl+'/api/V1/ManageTemplates/GetContactFields');
  }
  _get_ExchangeFields(): any {
    return this.http.get( this.actionUrl+'/api/V1/ManageTemplates/GetExchangeFields');
  }
  _get_AssignlistDashboard(UserId: number,TodayDate:string): any {
    debugger;
    return this.http.get( this.actionUrl+'/api/V1/Dashboard/EmployeeAssignedTask?UserId='+ UserId+'&TodayDate='+TodayDate);
  }
  _get_employeeListDropdown(): any {
    return this.http.get( this.actionUrl+'/api/V1/ManageEmployee/GetEmployeeListdropdown');
  }

  _add_employeePrevileges(data:any):any {
    return this.http.post( this.actionUrl+'/api/V1/ManageEmployee/AddMultipleEmployee', data);
  }
  
  _add_employee(data: any) {
    debugger;
    return this.http.post( this.actionUrl+'/api/V1/ManageEmployee/AddEmployee',data);
  }
  _add_Notes(data: any) {
    debugger;
    return this.http.post( this.actionUrl+'/api/V1/Notes/SendNote',data);
  }
  
  _update_employee(data: any) {
    debugger;
    return this.http.post( this.actionUrl+'/api/V1/ManageEmployee/UpdateEmployee',data);
  }

  _get_employeelist(): any {
    return this.http.get( this.actionUrl+'/api/V1/ManageEmployee/GetEmployeeList');
  }

  __getPrevileges_byId(UserId: number) {
    return this.http.get( this.actionUrl+'/api/V1/ManageEmployee/GetEmployee?UserId='+UserId);
  }

  _searchfilter(Param : object) {
    debugger;
    return this.http.post( this.actionUrl+'/api/V1/ManageEmployee/GetEmployee',Param);
  }

  _ActiveDeactiveEmployee(Id: number): any{
    debugger;
    return this.http.get(this.actionUrl +'/api/V1/ManageEmployee/ActiveOrDeEmployee?EmployeeId='+Id);
  }

}
