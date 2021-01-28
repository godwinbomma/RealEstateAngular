import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-manage-employee',
  templateUrl:'./manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})
export class ManageEmployeeComponent implements OnInit {


  ListOfEmployee: any = [];
  employee: any = {};
  employeefilter: any;
  searchText: string;
  public DbExchangeList: any = [];
  order: string = 'leadowner';
  p: number = 0;
  reverse: boolean = false;
  masterSelected: boolean;
  checkedList: any;
  
  constructor(private employeeservice: EmployeeService, private route: Router,
  ) {
  
  }
  ngOnInit(): void {
    this.getEmployeeList();
  }

  
  onSearch(value: string){
    debugger;
 console.log("value ", value);
 
    var self = this;
    console.log("DbExchangeList",JSON.stringify(self.DbExchangeList));
    this.ListOfEmployee = self.DbExchangeList.filter((a:any)=> Object.keys(a).some((k: any) => {
      if (a[k]) {
          return a[k].toString().toLowerCase().indexOf(value) > -1;
        
      }
      else{
        return false;
      }
    }));
  }
  setOrder(value: string) {
    debugger;
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  ActiveInactive(UserId: number) {
    debugger;
    this.employeeservice._ActiveDeactiveEmployee(UserId).subscribe((data: any) => {
      console.log(data)
      //this.getEmployeeList();
    })
  }
 
    getEmployeeList(){
    this.employeeservice._get_employeelist().subscribe((data: any)=> {
    this.ListOfEmployee = data.response;
    this.DbExchangeList = data.response;
    console.log(data);
    })
  }
    

  SearchFilter() {

    this.employeeservice._searchfilter(this.employee).subscribe((data: any) => {
      debugger;
      if(data.response.isreponseSuccess== true)
      {
        debugger;
      this.ListOfEmployee = data.response;
      console.log(data);
      }
      else
      {
        alert('No data');
      }
    }, (error:any) => {
    })
  }
}
