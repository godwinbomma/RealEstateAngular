import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import{ ExchangeService} from '../../service/exchange.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public DashBoard: any = [];
  public DashBoardCount: any = [];
  order: string = 'leadowner';
  p: number = 0;
  reverse: boolean = false;

  constructor(private ExchangeService: ExchangeService) {
   
  }
  ngOnInit(): void {
    this.getExchangeList();
  }

  setOrder(value: string) {
     if (this.order === value) {
       this.reverse = !this.reverse;
     }

     this.order = value;
  }

  checkUncheckAll() {
    // for (var i = 0; i < this.leadData.length; i++) {
    //   this.leadData[i].isSelected = this.masterSelected;
    // }
    // this.getCheckedItemList();
  }
  isAllSelected() {
    // this.masterSelected = this.leadData.every(function (item: any) {
    //   return item.isSelected == true;
    // })
    // this.getCheckedItemList();
  }

  getCheckedItemList() {
    // this.checkedList = [];
    // for (var i = 0; i < this.leadData.length; i++) {
    //   if (this.leadData[i].isSelected)
    //     this.checkedList.push(this.leadData[i]);
    // }
    // this.checkedList = JSON.stringify(this.checkedList);
  }
  getExchangeList() {
    debugger;
    let userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
    this.ExchangeService._getDashboard(userDetails['userId']).subscribe((data: any)=> {
      this.DashBoardCount = data.userData;
      console.log(data);
      }, error => {
  
      })
    
  }


}
