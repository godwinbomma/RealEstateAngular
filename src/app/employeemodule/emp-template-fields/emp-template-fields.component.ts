import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import{ EmployeeService} from '../../service/employee.service';

@Component({
  selector: 'app-emp-template-fields',
  templateUrl: './emp-template-fields.component.html',
  styleUrls: ['./emp-template-fields.component.css']
})
export class EmpTemplateFieldsComponent implements OnInit {


  public ExchangeList: any = [];
  public ContactList: any = [];
  public DbExchangeListcontact: any = [];
  public DbExchangeListexchange: any = [];
  searchText: string;
  order: string = 'leadowner';
  p: number = 0;
  reverse: boolean = false;

  constructor(private EmployeeService: EmployeeService) {
   
  }
  ngOnInit(): void {
    this.getContactFields();
    this.getExchangeFields();
  }

  getContactFields() {
    debugger;
    this.EmployeeService._get_ContactFields().subscribe((data: any)=> {
      this.ContactList = data.response;
      this.DbExchangeListcontact = data.response;
      console.log(data);
      })
    
  }
  onSearch(value: string){
    debugger;
 console.log("value ", value);
 
    var self = this;
    console.log("DbExchangeList",JSON.stringify(self.DbExchangeListexchange));
    this.ExchangeList = self.DbExchangeListexchange.filter((a:any)=> Object.keys(a).some((k: any) => {
      if (a[k]) {
          return a[k].toString().toLowerCase().indexOf(value) > -1;
        
      }
      else{
        return false;
      }
    }));
    this.ContactList = self.DbExchangeListcontact.filter((a:any)=> Object.keys(a).some((k: any) => {
      if (a[k]) {
          return a[k].toString().toLowerCase().indexOf(value) > -1;
        
      }
      else{
        return false;
      }
    }));
  }
  
  getExchangeFields() {
    debugger;
    this.EmployeeService._get_ExchangeFields().subscribe((data: any)=> {
      this.ExchangeList = data.response;
      this.DbExchangeListexchange=data.response;
      console.log(data);
      })
    
  }
  setOrder(value: string) {
   
  }
 
  checkUncheckAll() {
    
  }
  isAllSelected() {
   
  }

  getCheckedItemList() {
    
  }
  copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
