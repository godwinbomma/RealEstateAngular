import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import{ EmployeeService} from '../../service/employee.service';

@Component({
  selector: 'app-emp-assigned-task',
  templateUrl: './emp-assigned-task.component.html',
  styleUrls: ['./emp-assigned-task.component.css']
})
export class EmpAssignedTaskComponent implements OnInit {

  public AssignList: any = [];
 
  order: string = 'leadowner';
  p: number = 0;
  reverse: boolean = false;
  userDetails: any = [];
 
  constructor(private EmployeeService: EmployeeService) { }

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
    this.EmployeeService._get_Assignlist(+this.userDetails['userId']).subscribe((data: any)=> {
      this.AssignList = data.userData;
      console.log(data);
      }, () => {
  
      })
    
  }

}
