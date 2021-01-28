import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import{ ExchangeService} from '../../service/exchange.service';

@Component({
  selector: 'app-syn-open-exchange',
  templateUrl: './syn-open-exchange.component.html',
  styleUrls: ['./syn-open-exchange.component.css']
})
export class SynOpenExchangeComponent implements OnInit {
  public ExchangeList: any = [];
  order: string = 'leadowner';
  p: number = 0;
  reverse: boolean = false;
  userDetails: any = [];

  constructor(private ExchangeService: ExchangeService) {
   
  }
  ngOnInit(): void {
    debugger;
    this.userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
    this.getExchangeList();
  }
  
  getExchangeList() {
    debugger;
    this.ExchangeService._getExchangeslist(this.userDetails['userId']).subscribe((data: any)=> {
      this.ExchangeList = data.userData;
      console.log(data);
      }, (error:any) => {
  
      })
  }
  setOrder(value: string) {
   
  }
}
