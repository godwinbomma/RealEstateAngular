import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import{ ExchangeService} from '../../service/exchange.service';

@Component({
  selector: 'app-cus-dashboard-inchange',
  templateUrl: './cus-dashboard-inchange.component.html',
  styleUrls: ['./cus-dashboard-inchange.component.css']
})
export class CusDashboardInchangeComponent implements OnInit {


  public DashBoard: any = [];
  public DashBoardCount: any = [];
  userDetails: any = [];
  order: string = 'leadowner';
  p: number = 0;
  reverse: boolean = false;

  constructor(private ExchangeService: ExchangeService) {
   
  }
  ngOnInit(): void {
    debugger;
    this.userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
    this.getExchangeList();
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
  getExchangeList() {
    debugger;
    this.ExchangeService._getDashboard(this.userDetails['userId']).subscribe((data: any)=> {
      this.DashBoardCount = data.userData;
      this.DashBoard = data.userData.openExchnagesList;
      console.log(data);
      }, error => {
  
      })
    
  }
  getcloseExchangeList() {
    debugger;
    this.ExchangeService._getcloseexchange(this.userDetails['userId']).subscribe((data: any)=> {
      this.DashBoardCount = data.userData;
      this.DashBoard = data.userData.closedExchnagesList;
      console.log(data);
      }, error => {
  
      })
    
  }


}
