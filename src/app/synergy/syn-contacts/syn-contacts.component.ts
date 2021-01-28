import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../../service/contact.service';

@Component({
  selector: 'app-syn-contacts',
  templateUrl: './syn-contacts.component.html',
  styleUrls: ['./syn-contacts.component.css']
})
export class SynContactsComponent implements OnInit {
  userId : number = 0;
  public ContactList: any = [];
  order: string = 'leadowner';
  p: number = 0;
  searchText: string;
  public DbExchangeList: any = [];
  reverse: boolean = false;
  masterSelected: boolean;
  userDetails: any = [];
  contactListArray: any = [];
  constructor(private contactservice: ContactService) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
    this.getContactList();
  }

  onSearch(value: string){
    debugger;
 console.log("value ", value);
 
    var self = this;
    console.log("DbExchangeList",JSON.stringify(self.DbExchangeList));
    this.ContactList = self.DbExchangeList.filter((a:any)=> Object.keys(a).some((k: any) => {
      if (a[k]) {
          return a[k].toString().toLowerCase().indexOf(value) > -1;
        
      }
      else{
        return false;
      }
    }));
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  checkUncheckAll() {
   
  }

  getContactList() {
    debugger;
    let userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
    this.userId = userDetails['userId'];
    this.contactservice._getcustomerContacts(this.userId).subscribe((data:any) => {
      debugger;
      console.log(data['userData']);
      this.ContactList = data['userData'];
      this.DbExchangeList= data['userData'];
    }, (error:any) => {

    })
  }


}
