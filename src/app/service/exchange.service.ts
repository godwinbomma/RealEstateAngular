
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private actionUrl: string;
  constructor(
    private http: HttpClient,
    private router: Router

  ) { this.actionUrl = environment.apiUrl; }
  _getApproveExchanges() {

    return this.http.get(this.actionUrl + '/api/V1/Exchange/ExchangeApprovalList')
  }
  _get_ExchangeById(id: number): any {
    // const params = new HttpParams({ExchangeId: 1});
    return this.http.get(this.actionUrl + '/api/V1/Exchange/PreviewExchange?ExchangeId=' + id);
  };

  _get_ReplacementList(id: number) {
    return this.http.get(this.actionUrl + '/api/V1/Exchange/ReplacementList?ExchangeId=' + id);
  }

  _saveOrUpdateIdForm(data: any, state: string) {
    debugger;

    if (state == 'edit') {
      var url = this.actionUrl + '/api/V1/Exchange/UpdateIDForm';
    }
    else{
      var url = this.actionUrl + '/api/V1/Exchange/SaveIDForm';
    }
    return this.http.post(url, data);
  }

  _addtransaction(data: any, state: string) {

    if (state == 'edit') {
      var url = this.actionUrl + '/api/V1/Exchange/UpdateTrasaction';
    }
    else
    {
      var url = this.actionUrl + '/api/V1/Exchange/AddTrasaction';
    }
    return this.http.post(url, data);
  }

  _getExchanges() {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/Exchange/AdminExchangeList')
  }
  _getExchangeslistuserid() {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/Exchange/ExchangeListByUserId')
  }

  _Updateexchangenumber(exchangeid:number,exchangenumber:string) {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/Exchange/EditExchangeNumber?ExchangeId='+exchangeid+ '&ExchangeNumber='+ exchangenumber)
  }

  _getdocumentslotlist(id:number) {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/Exchange/Extensions?ExtensionId='+id)
  }

  _peakapprove(ExchangeID:number,UserId:number,Date:string) {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/Exchange/CustomerIdentificationRequestToAdmin?ExchangeId='+ExchangeID+ '&UserId='+ UserId+'&TodayDate='+Date)
  }
  _approvecontact(ContactId:number,LoginUserId:number,status:string) {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/Contacts/ApproveContact?ContactId='+ContactId+ '&LoginUserId='+ LoginUserId+'&status='+status)
  }
  _getDuplicatedropdown(exchangeid:number) {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/Exchange/GetDuplicateExchangeDropDownList?ExchangeId='+exchangeid)
  }
  _getDuplicatevalue(Fromid:number,Transid:number,Toid:number) {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/Exchange/DuplicateExchangeInsert?FromExchangeId='+Fromid+ '&PropertyTransactionId='+ Transid+'&ToExchangeId='+Toid)
  }
  //getStatelist
  _getStateslist() {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/Accounts/StateList')
  }
  //getCitylist
  getCityliste(StateId: number) {
    return this.http.get(this.actionUrl + '/api/V1/Accounts/CityList?StateId=' + StateId);
  }
  _getcustomizecolumn() {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/CustomColumns/ExchangeCustomColumn')
  }
  _getcontactcustomizecolumn() {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/CustomColumns/ContactCustomColumn')
  }
  _getcustomizecolumndata(data:any) {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/CustomColumns/GetExchangeCustomColumnData?ColumnName='+data)
  }
  _getcustomizecontactcolumndata(data:any) {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/CustomColumns/GetContactCustomColumnData?ColumnName='+data)
  }



  _getcustomfield() {
    debugger;
    return this.http.
      get(this.actionUrl + '/api/V1/CustomFields/GetAll')
  }
  _getnotificationdetail(TodayDate:string,id:number) {
    debugger;
    return this.http.
      get(this.actionUrl + '/api/V1/Alert/AdminDashboardAlerts?TodayDate='+TodayDate+'&UserId'+id)
  }
  _DailyAdminRun(TodayDate:string,id:number) {
    debugger;
    return this.http.
      get(this.actionUrl + '/api/V1/Alert/DailyAdminRun?TodayDate='+TodayDate+'&UserId='+id)
  }
  FilecurrentMonth(TodayDate:string) {
    debugger;
    return this.http.
      get(this.actionUrl + '/api/V1/Dashboard/FilesCurrentMonth?TodayDate='+TodayDate)
  }
  FilesCurrentYear(TodayDate:string) {
    debugger;
    return this.http.
      get(this.actionUrl + '/api/V1/Dashboard/FilesCurrentYear?TodayDate='+TodayDate)
  }
  Fundsleaving(TodayDate:string) {
    debugger;
    return this.http.
      get(this.actionUrl + '/api/V1/Dashboard/FundsLeaving?TodayDate='+TodayDate)
  }
  SynergyMonthRevenue(TodayDate:string) {
    debugger;
    return this.http.
      get(this.actionUrl + '/api/V1/Dashboard/SynergyMonthRevenue?TodayDate='+TodayDate)
  }
  SynergyyearRevenue(TodayDate:string) {
    debugger;
    return this.http.
      get(this.actionUrl + '/api/V1/Dashboard/SynergyYearRevenue?TodayDate='+TodayDate)
  }
  Synergyfilesmonth(TodayDate:string,UserId:number) {
    debugger;
    return this.http.
      get(this.actionUrl + '/api/V1/Dashboard/SynergyFilesCurrentMonth?TodayDate='+TodayDate+ '&UserId=' + UserId)
  }
  Synergyfilesyear(TodayDate:string,UserId:number) {
    debugger;
    return this.http.
      get(this.actionUrl + '/api/V1/Dashboard/FilesCurrentYear?TodayDate='+TodayDate+ '&UserId=' + UserId)
  }
  _getcontactcustomfield() {
    debugger;
    return this.http.
      get(this.actionUrl + '/api/V1/Contacts/GetContactCF')
  }
  _ActiveDeactiveCustom(Id: number): any{
    debugger;
    return this.http.get(this.actionUrl +'/api/V1/CustomFields/DisableCustomField?customFieldId='+Id);
  }
  _getcustomfieldbyId(customid: number) {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/CustomFields/GetCustomFields?customFieldId=' + customid)
  }

  _deletecustomfieldbyId(customid: number) {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/CustomFields/DeleteCustomField?customFieldId=' + customid)
  }
  _getExchangeslist(UserId: number) {

    return this.http.get(this.actionUrl + '/api/V1/Exchange/ExchangeListByUserId?UserId=' + UserId)
  }
  _getDashboard(UserId: number) {

    return this.http.get(this.actionUrl + '/api/V1/Dashboard/CustomerDashbaord?UserId=' + UserId)
  }
  _getcloseexchange(UserId: number) {

    return this.http.get(this.actionUrl + '/api/V1/Dashboard/CustomerClosedExchanges?UserId=' + UserId)
  }
  sendmessage(Message:string,UserId:number,TodayDate:string)
  {
    return this.http.get(this.actionUrl + '/api/V1/Alert/InsertCommonNotifications?description=' + Message+ '&UserId=' + UserId+ '&TodayDate=' + TodayDate)
  }

  _AssignExchangeListDropdown(): any {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/Exchange/EmployeeAssigndropdownList');
  }

  _ApplyTemplateDropdown(ExchangeId: number, UserId: number): any {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/Exchange/ApplyTemplate?ExchangeId=' + ExchangeId + '&UserId=' + UserId);
  }
  _UploadAllDocuments(data: any) {
    debugger;
    return this.http.post(this.actionUrl + '/api/V1/Exchange/UploadAllDocuments', data);
  }
  _UploadreplaceDocuments(data: any) {
    debugger;
    return this.http.post(this.actionUrl + '/api/V1/Exchange/UploadReplacementDocuments', data);
  }

  _DownloadApplyTemplate(TemplateId: number, ContactId: number, ExchangeId: number) {

    return this.http.get(this.actionUrl + '/api/V1/Exchange/GetDocumentMergeDetails?TemplateId=' + TemplateId + '&ContactId=' + ContactId + '&ExchangeId=' + ExchangeId);
  }


  _AssignEmployee(data: any): any {
    debugger;


    const formData: FormData = new FormData();
    for (var i = 0; i < data.FileList.length; i++) {
      formData.append("file[]", data.FileList[i]);
    }
    formData.append('ExchangeId', data.ExchangeId);
    formData.append('EmployeeId', data.EmployeeId);
    formData.append('TaskId', data.TaskId);
    formData.append('PropertyId', data.PropertyId);
    formData.append('SynergyClientId', data.SynergyClientId);
    formData.append('IsSynergyClient', data.IsSynergyClient);
    formData.append('EscrowDocumentsAreAttached', data.EscrowDocumentsAreAttached);
    formData.append('EscrowDocumentsRequestedNotYetReceived', data.EscrowDocumentsRequestedNotYetReceived);
    formData.append('PleaseRequestEscrowDocuments', data.PleaseRequestEscrowDocuments);
    formData.append('Note', data.Notes);
    formData.append('CreatedBy', data.CreatedBy);
    return this.http.post(this.actionUrl + '/api/V1/Exchange/AssignEmployee', formData);
  }

  postApiCall(url: string, data: any) {

    const httpHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const header = {
      headers: httpHeader
    }
    debugger;
    return this.http.post(this.actionUrl + url, data, header)
  }

  getApiCall(url: string) {

    const httpHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const header = {
      headers: httpHeader
    }
    return this.http.get(this.actionUrl + url, header)
  }

  _createExchange(id):Observable<any>{
    return this.http.get(`${this.actionUrl}/api/V1/Exchange/RelinquishedDuplicate?ExchangeId=${id}`)
   }
}
