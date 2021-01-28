import { DatePipe, LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '../../service/exchange.service';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {
  public Notificationlist: any = [];
  public DbExchangeList: any = [];
  public Filecurrentmonth: any = [];
  public Filecurrentyear: any = [];
  public Fundsleaving: any = [];
  public SynergyMonthRevenue: any = [];
  public SynergyYearRevenue: any = [];
  public userDetails: any = [];
  public date: any;
  constructor(private location: LocationStrategy,
    private ExchangeService: ExchangeService,
    private datePipe: DatePipe) {
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }

  ngOnInit(): void {
    this.userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || null;
    this.getNotificationalert();
    this.DailyAdminRun();
    this.FilesCurrentMonths();
    this.FilesCurrentyears();
    this.FundsLeavingthisyears();
    this.synergymonthrevnues();
    this.synergyyearrevnues();
   
  }

  getNotificationalert() {
    debugger;
    this.date = new Date();
    let latest_date = this.datePipe.transform(this.date, 'MM/dd/yyyy');

    this.ExchangeService._getnotificationdetail(latest_date, +this.userDetails['userId']).subscribe((success: any) => {
      debugger;
     
      this.Notificationlist = success['responseData'];
   
    }, error => {

    })
  }

  DailyAdminRun() {
    debugger;
    this.date = new Date();
    let latest_date = this.datePipe.transform(this.date, 'MM/dd/yyyy');

    this.ExchangeService._DailyAdminRun(latest_date, +this.userDetails['userId']).subscribe((success: any) => {
      debugger;


    }, error => {

    })
  }

  FilesCurrentMonths() {
    debugger;
    this.date = new Date();
    let latest_date = this.datePipe.transform(this.date, 'MM/dd/yyyy');

    this.ExchangeService.FilecurrentMonth(latest_date).subscribe((success: any) => {
      debugger;
      console.log('FilesCurrentMonths',success)
      this.Filecurrentmonth = success.response;
    }, error => {

    })
  }
  FilesCurrentyears() {
    debugger;
    this.date = new Date();
    let latest_date = this.datePipe.transform(this.date, 'MM/dd/yyyy');

    this.ExchangeService.FilesCurrentYear(latest_date).subscribe((success: any) => {
      debugger;
      this.Filecurrentyear = success.response;
    }, error => {

    })
  }
  FundsLeavingthisyears() {
    debugger;
    this.date = new Date();
    let latest_date = this.datePipe.transform(this.date, 'MM/dd/yyyy');

    this.ExchangeService.Fundsleaving(latest_date).subscribe((success: any) => {
      debugger;
      this.Fundsleaving = success.response;
    }, error => {

    })
  }
  synergymonthrevnues() {
    debugger;
    this.date = new Date();
    let latest_date = this.datePipe.transform(this.date, 'MM/dd/yyyy');

    this.ExchangeService.SynergyMonthRevenue(latest_date).subscribe((success: any) => {
      debugger;
      this.SynergyMonthRevenue = success.response;
    }, error => {

    })
  }
  synergyyearrevnues() {
    debugger;
    this.date = new Date();
    let latest_date = this.datePipe.transform(this.date, 'MM/dd/yyyy');

    this.ExchangeService.SynergyyearRevenue(latest_date).subscribe((success: any) => {
      debugger;
      this.SynergyYearRevenue = success.response;
    }, error => {

    })
  }
}
