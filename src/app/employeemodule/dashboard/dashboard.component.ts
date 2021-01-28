import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import{ EmployeeService} from '../../service/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public AssignList: any = [];
  public Unidentified45days: any = [];
  public NewclientUploads: any = [];
  public MoneyCloseOut: any = [];
  public NonMoneyCloseOut: any = [];
  public UnfundedCloseout: any = [];
  public PositiveBalance: any = [];
  public ListCount: any = [];
  order: string = 'leadowner';
  datePickerConfig = { format: 'MM/DD/YYYY' };
  p: number = 0;
  reverse: boolean = false;
  userDetails: any = [];


 
  constructor(private EmployeeService: EmployeeService,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
    this.getAssignList();
    

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
  getAssignList() {
    debugger;
    let dateofbirth = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
    this.EmployeeService._get_AssignlistDashboard(+this.userDetails['userId'],dateofbirth).subscribe((data: any)=> {
      this.AssignList = data.response.assignedList;
      this.ListCount=data.response;
      console.log(data);
      }, () => {
  
      })
    
  }
  getUnidentified45days() {
    debugger;
    let dateofbirth = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
    this.EmployeeService._get_AssignlistDashboard(4,dateofbirth).subscribe((data: any)=> {
      this.Unidentified45days = data.response.assignedList;
      this.ListCount=data.response;
      console.log(data);
      }, () => {
  
      })
    
  }
  getNewclientUploads() {
    debugger;
    this.EmployeeService._get_AssignlistDashboard(4,"01/10/2020").subscribe((data: any)=> {
      this.NewclientUploads = data.response.assignedList;
      this.ListCount=data.response;
      console.log(data);
      }, () => {
  
      })
    
  }
  getMoneyCloseOut() {
    debugger;
    this.EmployeeService._get_AssignlistDashboard(4,"01/10/2020").subscribe((data: any)=> {
      this.MoneyCloseOut = data.response.assignedList;
      this.ListCount=data.response;
      console.log(data);
      }, () => {
  
      })
    
  }
  getNonMoneyCloseOut() {
    debugger;
    this.EmployeeService._get_AssignlistDashboard(4,"01/10/2020").subscribe((data: any)=> {
      this.NonMoneyCloseOut = data.response.assignedList;
      this.ListCount=data.response;
      console.log(data);
      }, () => {
  
      })
    
  }
  getUnfundedCloseout()
  {
    this.EmployeeService._get_AssignlistDashboard(4,"01/10/2020").subscribe((data: any)=> {
      this.UnfundedCloseout = data.response.assignedList;
      this.ListCount=data.response;
      console.log(data);
      }, () => {
  
      })
    
  }
  getPositiveBalance()
  {
    this.EmployeeService._get_AssignlistDashboard(4,"01/10/2020").subscribe((data: any)=> {
      this.PositiveBalance = data.response.assignedList;
      this.ListCount=data.response;
      console.log(data);
      }, () => {
  
      })
    
  }



}
