import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import{ ExchangeService} from '../../service/exchange.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  public leadData: any = [];
  RevenueMonth:boolean;
RevenueYear:boolean;
FilesMonth:boolean;
FilesYear:boolean;
SynergyExchange:boolean;
SynergyAccounts:boolean;
MonthlyAccount:boolean;
Usertypeid:number;
  order: string = 'leadowner';
  p: number = 0;
  public ExchangeList: any = [];
  public SynFilecurrentmonth: any = [];
  public SynFilecurrentyear: any = [];
  reverse: boolean = false;
  masterSelected: boolean;
  checkedList: any;
  userDetails: any = [];
  date: Date;
  constructor(private ExchangeService: ExchangeService,
    private datePipe: DatePipe) {
    for (let i = 1; i <= 100; i++) {
      this.leadData.push(`item ${i}`);
    }
    this.masterSelected = false;

    this.getCheckedItemList();
  }
 
  ngOnInit(): void {
    this.userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
    this.getExchangeList();
this.synergyfilesinyear();
this.synergyfilesinmonth();
debugger;
this.RevenueMonth=this.userDetails['revenueMonth'];
this.RevenueYear=this.userDetails['revenueYear'];
this.SynergyAccounts=this.userDetails['synergyAccounts'];
this.FilesMonth=this.userDetails['filesMonth'];
this.FilesYear=this.userDetails['filesYear'];
this.MonthlyAccount=this.userDetails['monthlyAccount'];
this.SynergyExchange=this.userDetails['synergyExchange'];
this.Usertypeid=this.userDetails['userTypeId']
   
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  getExchangeList() {
    debugger;
    debugger;
    this.ExchangeService._getExchangeslist(this.userDetails['userId']).subscribe((data: any)=> {
    
     this.ExchangeList = data.userData;
      console.log(data);
      }, error => {
  
      })
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
  synergyfilesinyear() {
    debugger;
    this.date = new Date();
    let latest_date = this.datePipe.transform(this.date, 'MM/dd/yyyy');

    this.ExchangeService.Synergyfilesyear(latest_date,this.userDetails['userId']).subscribe((success: any) => {
      debugger;
      this.SynFilecurrentyear = success.response;
    }, error => {

    })
  }
  synergyfilesinmonth() {
    debugger;
    this.date = new Date();
    let latest_date = this.datePipe.transform(this.date, 'MM/dd/yyyy');

    this.ExchangeService.Synergyfilesmonth(latest_date,this.userDetails['userId']).subscribe((success: any) => {
      debugger;
      this.SynFilecurrentmonth = success.response;
    }, error => {

    })
  }

}
