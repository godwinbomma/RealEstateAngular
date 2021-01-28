import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import{ ExchangeService} from '../../service/exchange.service';

@Component({
  selector: 'app-exchange-list',
  templateUrl: './exchange-list.component.html',
  styleUrls: ['./exchange-list.component.css']
})
export class ExchangeListComponent implements OnInit {

  public ExchangeList: any = [];
  order: string = 'leadowner';
  p: number = 0;
  reverse: boolean = false;

  constructor(private ExchangeService: ExchangeService) {
   
  }
  ngOnInit(): void {
    this.getExchangeList();
  }
  
  getExchangeList() {
    debugger;
    this.ExchangeService._getExchanges().subscribe((data: any)=> {
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
