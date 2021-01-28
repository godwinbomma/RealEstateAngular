import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports-balance-breakdown',
  templateUrl: './reports-balance-breakdown.component.html',
  styleUrls: ['./reports-balance-breakdown.component.css']
})
export class ReportsBalanceBreakdownComponent implements OnInit {
  datePickerConfig = {
    format: 'DD-MM-YYYY'
  };
  constructor() { }

  ngOnInit(): void {
  }

}
