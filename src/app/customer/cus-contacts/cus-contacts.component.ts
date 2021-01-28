import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../service/contact.service';

@Component({
  selector: 'app-cus-contacts',
  templateUrl: './cus-contacts.component.html',
  styleUrls: ['./cus-contacts.component.css']
})
export class CusContactsComponent implements OnInit {
  order: string = 'leadowner';
  p: number = 0;
  reverse: boolean = false;
  masterSelected: boolean;
  checkedList: any;
  contactListArray: any = [];
  SearchText: string = '';
  userTypeId: string = "3";
  userDetails: any = [];
  searchText: string;
  public DbExchangeList: any = [];

  constructor(
    private contactservice: ContactService
    ) {
  }
  ngOnInit(): void {
    this.userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
    this.getContactList();
   
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  getContactList() {
    this.contactservice._getcustomerContacts(this.userDetails['userId']).subscribe((success: any) =>  {
      debugger;
      //this.authService.postApiCall("Contacts/ContactList?UserId=" + userDetails['userId'], jsonObj).subscribe(success => {
      this.contactListArray = success['userData'];
      this.DbExchangeList=success['userData'];
    }, error => {

    })
  }
  onSearch(value: string){
    debugger;
 console.log("value ", value);
 
    var self = this;
    console.log("DbExchangeList",JSON.stringify(self.DbExchangeList));
    this.contactListArray = self.DbExchangeList.filter((a:any)=> Object.keys(a).some((k: any) => {
      if (a[k]) {
          return a[k].toString().toLowerCase().indexOf(value) > -1;
        
      }
      else{
        return false;
      }
    }));
  }
}
