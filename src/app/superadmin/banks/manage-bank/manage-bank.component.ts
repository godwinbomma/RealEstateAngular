import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-manage-bank',
  templateUrl: './manage-bank.component.html',
  styleUrls: ['./manage-bank.component.css']
})
export class ManageBankComponent implements OnInit {
  order: string = 'leadowner';
  p: number = 0;
  reverse: boolean = false;
  masterSelected: boolean;
  checkedList: any;
  banklist: any = [];
  banklistdata: any = [];
  SearchText: string = '';
  userTypeId: string = "3";
  userDetails: any = [];
  searchText: string;
  public DbExchangeList: any = [];
  constructor( private route: Router,
    private authService: AuthServiceService,
    private contactservice: ContactService,) {
   
    this.masterSelected = false;

    this.getCheckedItemList();
  }
  ngOnInit(): void {
    this.userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
    this.getBankList();
  }

  
  getBankList() {
debugger;
    this.contactservice._getBank().subscribe((success: any) =>  {
      debugger;
      //this.authService.postApiCall("Contacts/ContactList?UserId=" + userDetails['userId'], jsonObj).subscribe(success => {
      this.banklist = success['userData'];
      this.DbExchangeList=success['userData'];
    }, error => {

    })
  }

  getbankdetails(bankid:number) {
    debugger;
        this.contactservice._getBankDetails(bankid).subscribe((success: any) =>  {
          debugger;
          //this.authService.postApiCall("Contacts/ContactList?UserId=" + userDetails['userId'], jsonObj).subscribe(success => {
          this.banklistdata = success['userData']['trasactionsLists'];
         
        }, error => {
    
        })
      }
  onSearch(value: string){
    debugger;
 console.log("value ", value);
 
    var self = this;
    console.log("DbExchangeList",JSON.stringify(self.DbExchangeList));
    this.banklist = self.DbExchangeList.filter((a:any)=> Object.keys(a).some((k: any) => {
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
  isAllSelected() {
   
  }

  getCheckedItemList() {
    
  }


}
