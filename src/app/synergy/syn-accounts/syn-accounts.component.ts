import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../service/contact.service';
import { ServiceService } from '../../service/service.service';
// import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';



@Component({
  selector: 'app-syn-accounts',
  templateUrl: './syn-accounts.component.html',
  styleUrls: ['./syn-accounts.component.css']
})
export class SynAccountsComponent implements OnInit {

  userId : number = 0;
  public ContactList: any = [];
  order: string = 'leadowner';
  p: number = 0;
  reverse: boolean = false;
  masterSelected: boolean;
 
  public leadData: any = [];
  accountList:any=[];
  checkedList: any;
  constructor(private contactservice: ContactService,private excelService: ServiceService) {
    for (let i = 1; i <= 100; i++) {
      this.leadData.push(`item ${i}`);
    }
    this.masterSelected = false;

    this.getCheckedItemList();
  }
  ngOnInit(): void {
    this.getAccountList();
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  checkUncheckAll() {
    for (var i = 0; i < this.leadData.length; i++) {
      this.leadData[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }
  isAllSelected() {
    this.masterSelected = this.leadData.every(function (item: any) {
      return item.isSelected == true;
    })
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.leadData.length; i++) {
      if (this.leadData[i].isSelected)
        this.checkedList.push(this.leadData[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);
  }
  getAccountList() {
    debugger;
    let userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
    this.userId = userDetails['userId'];
    this.contactservice._getAccounts(this.userId).subscribe((data:any) => {
      debugger;
      console.log(data['userData']);
      this.accountList = data['userData'];
    }, (error:any) => {

    })
  }
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.accountList, 'sample');
  }
  // exportexchangenumberAsXLSX():void {
  //   this.excelService.exportAsExcelFile(this.accountList, 'sample');
  // }
}
