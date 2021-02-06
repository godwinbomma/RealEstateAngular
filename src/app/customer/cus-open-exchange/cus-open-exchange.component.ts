import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import{ ExchangeService} from '../../service/exchange.service';

@Component({
  selector: 'app-cus-open-exchange',
  templateUrl: './cus-open-exchange.component.html',
  styleUrls: ['./cus-open-exchange.component.css']
})
export class CusOpenExchangeComponent implements OnInit {


  
  public ExchangeList: any = [];
  order: string = 'leadowner';
  p: number = 0;
  reverse: boolean = false;
  userDetails: any = [];

  constructor(private ExchangeService: ExchangeService) {
   
  }
  ngOnInit(): void {
    this.userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
    this.getExchangeList();
  }
  
  getExchangeList() {
    debugger;
    this.ExchangeService._getExchangeslist(this.userDetails['userId']).subscribe((data: any)=> {
      debugger;
      this.ExchangeList = data.userData;
      console.log(data);
      }, error => {
  
      })
    
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

