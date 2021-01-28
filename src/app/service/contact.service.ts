import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private actionUrl: string;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.actionUrl = environment.apiUrl;
  }

  _getContacts(UserId: number) {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/Contacts/ContactList')
  }
  _getAgents() {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/Contacts/GetApprovalContactList')
  }

  _getlinkedAgents(UserId: number) {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/Contacts/GetContactListMappedBySynergy?UserId=' + UserId)
  }
  _getcustomerContacts(UserId: number)
  {
    return this.http.get(this.actionUrl + '/api/V1/Contacts/CustomerContactList?UserId=' + UserId)
  }
  _getBank() {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/Bank/GetAll')
  }
  _getBankDetails(BankId:number) {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/Bank/GetBankTrasansactionList?BankId='+ BankId)
  }
  _getAccounts(UserId: number) {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/Exchange/SynergyAccount?UserId=' + UserId)
  }
  _getAccountsExchange(Exchangeid: number) {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/Exchange/GetSynergyAccount?ExchangeId=' + Exchangeid)
  }

  __getContactdetails_byId(ContactId: number) {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/Contacts/Contact?UserId=' + ContactId)
  }
  __getBank_byId(Bankid: number) {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/Bank/GetBank?BankId=' + Bankid)
  }

  _searchContacts(data: any) {

    return this.http.post(this.actionUrl + '/api/V1/Contacts/SearchContact', data)
  }

  _ContactListDropdown(): any {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/Contacts/ContactDropdown');
  }
  _ClientContactListDropdown(): any {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/Contacts/ClientContactList');
  }
  _ContactListDropdownVal(): any {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/Contacts/ContactList');
  }
  _synergyContactListDropdown(): any {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/Contacts/SynergyContactList');
  }

  SynergyExecutiveContactList(): any {
    debugger;
    return this.http.get(this.actionUrl + '/api/V1/Contacts/SynergyExecutiveContactList');
  }

  _getCustomercontacts(UserId: number) {
  
    return this.http.get(this.actionUrl + '/api/V1/Contacts/CustomerContactList?UserId=' + UserId)
  }

  _addContacts(data: any) {
    return this.http.post(this.actionUrl + '/api/V1/Contacts/AddContact', data)
  }

  _updateContacts(data: any) {
    return this.http.post(this.actionUrl + '/api/V1/Contacts/UpdateContact', data)
  }




  postApiCall(url: string, data: any) {
    debugger;
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
}


